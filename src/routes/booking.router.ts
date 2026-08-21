import { Router } from "express"
import {getMemberBookings, bookSession, cancelBooking} from "../controllers/booking.controller";
import {verifyToken, requireRole} from "../middlewares/auth.middleware";

export const bookingRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Member
 *     description: Members area
 */


/**
 * @swagger
 * /bookings/sessions/{sessionId}/book:
 *   post:
 *     tags: [Member]
 *     summary: books a session for the member
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Id of the class session to be booked
 *     responses:
 *       201:
 *         description: Successfully booked session
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad request (Session full, already booked, or already started/finished)
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only members
 *       404:
 *         description: The session was not found
 *       500:
 *         description: server error!
 */
bookingRouter.post('/sessions/:sessionId/book',verifyToken, requireRole("member"), bookSession); // member only


/**
 * @swagger
 * /bookings/mybookings:
 *   get:
 *     tags: [Member]
 *     summary: gets the member's bookings
 *     responses:
 *       200:
 *         description: Successfully listed the bookings
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only members
 *       404:
 *         description: No bookings were not found
 *       500:
 *         description: server error!
 */
bookingRouter.get('/myBookings',verifyToken, requireRole("member"), getMemberBookings); // member only

/**
 * @swagger
 * /bookings/{bookingId}:
 *   patch:
 *     tags: [Member]
 *     summary: cancelling an active booking
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Id of the active booking to be cancelled
 *     responses:
 *       200:
 *         description: Successfully cancelled booking
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Can't cancel booking that has already started or finished
 *       401:
 *         description: Not authorized, invalid or expired token
 *       403:
 *         description: Forbidden, only members
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: server error!
 */
bookingRouter.patch('/:bookingId',verifyToken, requireRole("member"), cancelBooking); // member only
