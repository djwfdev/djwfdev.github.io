import express from 'express';
import { getMotorists, createMotorist, deleteMotorist } from '../controllers/motorist_controllers.js';

const router = express.Router();

router.get('/motorists', getMotorists);
router.post('/motorists', createMotorist);
router.delete('/motorists/:id', deleteMotorist);

export default router;