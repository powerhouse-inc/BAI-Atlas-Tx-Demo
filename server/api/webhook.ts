import express from 'express';
import { importTransactions } from 'scripts/account-transactions/server/importScript';

const router = express.Router();

router.post('/', express.json(), async (req, res) => {
    try {
        const jsonData = req.body;
        if (jsonData.erc20Transfers) {
            console.log(`${jsonData.erc20Transfers.length} transactions received`);
            // Import transactions
            await importTransactions(jsonData);
        }

        // Immediately acknowledge receipt
        res.status(200).send('Webhook received');
    } catch (error: any) {
        console.log('Error processing webhook:', error.message);
        res.status(400).send('Invalid JSON format');
    }
});

export default router;
