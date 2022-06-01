import express from 'express';
import { getAssistProfs, deleteAssistProf, assistProfSignup, assistProfLogin } from '../controllers/assistance-professional_controllers.js';

const router = express.Router();

router.get('/assistance-professionals', getAssistProfs);
router.delete('/assistance-professionals/:id', deleteAssistProf);

router.post('/signup/assistance-professional', assistProfSignup);
router.post('/login/assistance-professional', assistProfLogin);

export default router;