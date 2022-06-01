import express from 'express';
import { getVehicles, createVehicle, deleteVehicle } from '../controllers/vehicle_controllers.js';

const router = express.Router();

router.get('/vehicles', getVehicles);
router.post('/vehicles', createVehicle);
router.delete('/vehicles/:id', deleteVehicle);

export default router;