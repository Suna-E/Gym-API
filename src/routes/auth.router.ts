import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
/*member vs trainer privellages, pass requireRole('member') or requireRole('trainer')
router.get();
router.post();
router.delete();*/

export default authRouter;