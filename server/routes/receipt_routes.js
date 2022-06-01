import express from 'express';
import { getReceipts, createReceipt, deleteReceipt } from '../controllers/receipt_controllers.js';

const router = express.Router();

router.get('/receipts', getReceipts);
router.post('/receipts', createReceipt);
router.delete('/receipts/:id', deleteReceipt);

export default router;