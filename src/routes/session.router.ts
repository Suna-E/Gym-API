import { Router } from 'express';
import {CreateSession,  UpdateSession,  DeleteSession,  GetAllSessions, GetSessionBookings} from '../controllers/session.controller';
import { verifyToken, requireRole } from '../middlewares/auth.middleware'
import { validateCreateSession, validateUpdateSession } from '../middlewares/validate.middleware'


export const sessionRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: ClassSession
 *     description: Class Session Area
 */


/**
 * @swagger
 * /sessions:
 *   get:
 *     tags: [ClassSession]
 *     summary: get all sessions and also support search
 *     parameters:
 *       - in: query
 *         name: className
 *         description: search with a specific name
 *       - in: query
 *         name: day
 *         description: search with a specific day
 *       - in: query
 *         name: trainerName
 *         description: search with a specific trainer
 *       - in: query
 *         name: availability
 *         description: search for available classes only
 *     responses:
 *       200:
 *         description: display all sessions
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClassSession'
 *       401:
 *         description: Not authorized, invalid or expired token
 *       404:
 *         description: No sessions was found
 *       500:
 *         description: server error!
 */
sessionRouter.get('/',verifyToken, GetAllSessions);

/**
 * @swagger
 * /sessions/{id}/bookings:
 *   get:
 *     tags: [ClassSession]
 *     summary: view bookings for the trainer session they own
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the class session id
 *     responses:
 *       200:
 *         description: display the bookings of the session that the trainer owns
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                     memberName:
 *                       type: string
 *                       example: "ahmed mohammed"
 *                     email:
 *                       type: string
 *                       example: "ahmed@gmail.com"
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only trainers
 *       404:
 *         description: Session not found or you are not authorized to view its bookings
 *       500:
 *         description: server error!
 */
sessionRouter.get('/:id/bookings',verifyToken, requireRole("trainer"), GetSessionBookings);


/**
 * @swagger
 * /sessions:
 *   post:
 *     tags: [ClassSession]
 *     summary: create a new class session
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - className
 *                - startTime
 *                - capacity
 *              properties:
 *                 className:
 *                    type: string
 *                    example: "yoga"
 *                 startTime:
 *                    type: date-time
 *                    example: "2026-09-12T10:00:000Z"
 *                 capacity:
 *                    type: number
 *                    example: 20
 *     responses:
 *       201:
 *         description: Successfully created a session
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSession'
 *       400:
 *         description: Bad request invalid data
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only trainers
 *       500:
 *         description: server error!
 */
sessionRouter.post('/',verifyToken, requireRole("trainer"), validateCreateSession, CreateSession); // trainer only

/**
 * @swagger
 * /sessions/{id}:
 *   patch:
 *     tags: [ClassSession]
 *     summary: update a class session that the trainer owns
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - className
 *                - startTime
 *                - capacity
 *              properties:
 *                 className:
 *                    type: string
 *                    example: "yoga"
 *                 startTime:
 *                    type: date-time
 *                    example: "2026-09-12T10:00:000Z"
 *                 capacity:
 *                    type: number
 *                    example: 20
 *     responses:
 *       200:
 *         description: Successfully updated a session
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClassSession'
 *       400:
 *         description: Bad request invalid data
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only trainers
 *       404:
 *         description: the session was not found
 *       500:
 *         description: server error!
 */
sessionRouter.patch('/:id',verifyToken, requireRole("trainer"), validateUpdateSession, UpdateSession); // trainer only


/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     tags: [ClassSession]
 *     summary: delete a class session that the trainer owns
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: session id to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted a session
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only trainers
 *       404:
 *         description: Session not found 
 *       500:
 *         description: server error!
 */
sessionRouter.delete('/:id',verifyToken, requireRole("trainer"), DeleteSession); // trainer only

export default sessionRouter;