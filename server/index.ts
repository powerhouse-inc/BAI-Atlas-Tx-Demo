import express from 'express';
import createInvoiceRouter from './api/createInvoice';
import cors from 'cors';
import webhookRouter from './api/webhook';

const app = express();

// Set higher limits BEFORE other middleware and route handlers
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));

app.use(cors({
    origin: '*', // Allow requests from your React app
    credentials: true
  }));

// Use the invoice router
app.use('/api', createInvoiceRouter);
app.use('/webhook', webhookRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});