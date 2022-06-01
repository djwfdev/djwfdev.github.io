import express from 'express';
import { getPayControllers, createPayController, deletePayController } from '../controllers/payment-controller_controllers.js';

const router = express.Router();

router.get('/payment-controllers', getPayControllers);
router.post('/payment-controllers', createPayController);
router.delete('/payment-controllers/:id', deletePayController);

export default router;