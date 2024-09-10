import { Router } from 'express';
import { createUser, getUserById ,sendOtp,verifyOtp} from '../controllers/userControllers';

const router = Router();

router.post('/createUser', createUser);

router.post('/sendOtp', sendOtp);

// router.get('/getUser/:id', getUserById);
router.post('/verifyOtp', verifyOtp);


export default router;
