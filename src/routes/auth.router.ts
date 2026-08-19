import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth area
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: register a new user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully registered user
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists with this email
 *       500:
 *         description: server error!
 */
authRouter.post('/register', registerUser);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: login for an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password 
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string  
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: No email or password provided
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: server error!
 */
authRouter.post('/login', loginUser);
/*member vs trainer privellages, pass requireRole('member') or requireRole('trainer')
router.get();
router.post();
router.delete();*/

export default authRouter;