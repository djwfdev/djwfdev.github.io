import express from 'express';
import { getLocations, createLocation, deleteLocation } from '../controllers/location_controllers.js';

const router = express.Router();

router.get('/locations', getLocations);
router.post('/locations', createLocation);
router.delete('/locations/:id', deleteLocation);

export default router;