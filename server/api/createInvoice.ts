//Create neww route that goes to 

import express from 'express';
import axios from 'axios';
import { executeTokenTransfer, checkTransactionExecuted } from './gnosisTransactionBuilder'
import { updateInvoiceStatus } from '../../scripts/invoice/main';
import { uploadPdfAndGetJson } from '../utils/pdfToDocumentAi';

const router = express.Router();

// Move these lines before any route definitions
router.use(express.json({limit: '1mb'}));
router.use(express.urlencoded({limit: '1mb', extended: true}));

const API_URL = 'https://api.request.finance/invoices';
const API_KEY = process.env.REQUEST_FINANCE_API_KEY; // Store in .env file

router.post('/pdf-upload', async (req, res) => {
    try {
        console.log("Received PDF upload request");
        const pdfData = req.body.pdfData;
        if (!pdfData) {
            console.log("No PDF data provided");
            return res.status(400).json({ error: 'No PDF data provided' });
        }
        console.log("Calling uploadPdfAndGetJson...");
        const result = await uploadPdfAndGetJson(pdfData);
        console.log("Processing complete, sending response");
        res.json(result);
    } catch (error: any) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ 
            error: 'Failed to process PDF',
            message: error.message 
        });
    }
});

router.post('/create-invoice', async (req, res) => {
    console.log('Getting a request to create an invoice', req.body);
    try {
        // First API call to create the invoice
        const response = await axios.post(API_URL, req.body, {
            headers: {
                "Authorization": `${API_KEY}`,
                'Content-Type': 'application/json',
                'X-Network': 'mainnet',
            },
        });

        console.log('Server: Invoice created successfully:', response.data.id);

        try {
            // Second API call to make it on-chain
            const onChainResponse = await axios.post(
                `https://api.request.finance/invoices/${response.data.id}`,
                {},
                {
                    headers: {
                        'Authorization': `${API_KEY}`,
                        'Content-Type': 'application/json',
                        'X-Network': 'mainnet',
                    },
                }
            );
            console.log('Server: Invoice made on-chain successfully:', onChainResponse.data.invoiceLinks);

            // Send only one response
            res.json(onChainResponse.data);
        } catch (error) {
            console.error('Server: Error making invoice on-chain:', error);
        }

    } catch (error: any) {
        console.error('Error creating invoice: error.response', error.response.data);
        res.status(500).json({ error: 'Failed to create invoice', errors: error.response.data.errors });
    }
});

router.post('/update-invoice-status', async (req, res) => {
    try {
        const { invoiceNo } = req.body;
        await updateInvoiceStatus(invoiceNo);
        res.json({ message: 'Invoice status updated successfully' });
    } catch (error) {
        console.error('Error updating invoice status:', error);
        res.status(500).json({ error: 'Failed to update invoice status' });
    }
});



router.post('/transfer', async (req, res) => {
    try {
        const { payerWallet, paymentDetails, invoiceNo } = req.body;
        const result = await executeTokenTransfer(payerWallet, paymentDetails);
        res.json(result);
        // await checkTransactionExecuted(result.txHash.safeTxHash, invoiceNo);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// server/api/createInvoice.ts
router.get('/transaction-status/:safeTxHash/:invoiceNo', (req, res) => {
    const { safeTxHash, invoiceNo } = req.params;

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Send initial connection message
    res.write(`data: ${JSON.stringify({ status: 'connecting' })}\n\n`);

    // Start monitoring the transaction
    const interval = 5000; // 5 seconds
    const maxAttempts = 360; // Maximum number of attempts (e.g., 30 minutes)
    let attempts = 0;
    const intervalId = setInterval(async () => {
        try {
            const result = await checkTransactionExecuted(safeTxHash, invoiceNo);
            if (result) {
                res.write(`data: ${JSON.stringify({ status: 'completed', safeTxHash, invoiceNo })}\n\n`);
                clearInterval(intervalId);
                res.end();
                return;
            }
            attempts++;
            if (attempts >= maxAttempts) {
                console.log('Max attempts reached, stopping checks.');
                clearInterval(intervalId);
                res.end();
            }
        } catch (error: any) {
            console.error('Error updating invoice status');
            clearInterval(intervalId);
            res.end();
        }
    }, interval);

    // Clean up if client disconnects
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});

export default router; 