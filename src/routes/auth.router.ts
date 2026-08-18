"post /signup"
"post /signin"
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { decjwt, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
/*member vs trainer privellages, pass requireRole('member') or requireRole('trainer')
router.get();
router.post();
router.delete();*/

export default router;