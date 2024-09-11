import { Router } from 'express';
import { createUser, sendOtp, verifyOtp } from '../controllers/userControllers';
import otpRateLimiter from '../ratelimiter/rateLimiter';

const router = Router();

router.post('/createUser', createUser);
router.post('/sendOtp',otpRateLimiter ,sendOtp);

router.post('/verifyOtp', verifyOtp);


export default router;
