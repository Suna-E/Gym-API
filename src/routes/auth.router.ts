import { Router } from 'express';
import { registerUser, loginUser, logOut } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

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
 *                 example: "test@gmail.com"
 *               password:
 *                 type: string
 *                 example: "12345678Aa!"
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


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: logging out user
 *     responses: 
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Not authorized, invalid or expired token
 *       500:
 *         description: server error!
 */
authRouter.post('/logout', verifyToken, logOut);
export default authRouter;