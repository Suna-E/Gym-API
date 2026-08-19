import { Router } from "express"
import {getMemberBookings, bookSession, cancelBooking} from "../controllers/booking.controller";
import {verifyToken, requireRole} from "../middlewares/auth.middleware";

export const bookingRouter = Router();

bookingRouter.post('/sessions/:sessionId/book',verifyToken, requireRole("member"), bookSession); // member only
bookingRouter.get('/myBookings',verifyToken, requireRole("member"), getMemberBookings); // member only
bookingRouter.patch('/bookings/bookingId',verifyToken, requireRole("member"), cancelBooking); // member only
