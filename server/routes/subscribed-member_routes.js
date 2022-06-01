import express from 'express';
import { getSubMembers, deleteSubMember, subMemberSignup, subMemberLogin, getMembersBySearch } from '../controllers/subscribed-member_controllers.js';

const router = express.Router();

router.get('/subscribed-members', getSubMembers);
router.delete('/subscribed-members/:id', deleteSubMember);

router.get('/search', getMembersBySearch);
router.post('/signup/member', subMemberSignup);
router.post('/login/member', subMemberLogin);

export default router;