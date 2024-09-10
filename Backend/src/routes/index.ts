import { Router } from 'express';
import { createUser, sendOtp, verifyOtp } from '../controllers/userControllers';

const router = Router();

router.post('/createUser', createUser);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);


export default router;
