import express from 'express';
import { getServices, createService, deleteService } from '../controllers/service_controllers.js';

const router = express.Router();

router.get('/services', getServices);
router.post('/services', createService);
router.delete('/services/:id', deleteService);

export default router;