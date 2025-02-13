import express from 'express';
import createInvoiceRouter from './api/createInvoice';
import cors from 'cors';
import webhookRouter from './api/webhook';

const app = express();
app.use(express.json());
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