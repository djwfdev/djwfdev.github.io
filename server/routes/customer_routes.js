import express from 'express';
import { getCustomers, createCustomer, deleteCustomer } from '../controllers/customer_controllers.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.post('/customers', createCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;