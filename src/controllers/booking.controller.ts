import {Request, Response} from "express";
import {Booking} from "../models/booking.model";

"post /sessions/:sessionId/book" // member only
const bookSession = async (req:Request, res:Response) => {
    try {
        const session = await classSession.findById(req.params.sessionId);
        if(!session)
        {
            return res.status(404).json( "The session was not found");
        }

        if(new Date() >= session.timeSlot)
        {
            return res.status(400).json({message: "Can't book this booking that has already started or finished"});
        }

        const existingBooking = await Booking.findOne(
            {Member: req.user.id as string,
             Session: req.params.sessionId as string}
        );

        if(existingBooking)
        {
            return res.status(400).json( "This session is already booked");

        }

        const currentBookingsCount = await Booking.countDocuments({ Session: req.params.sessionId as string,
                                                                    Status: "booked"});
        if(currentBookingsCount >= session.capacity)
        {
            return res.status(400).json({message: "This session is Full"});
        }

        const newBooking = await Booking.create({
            Session: req.params.sessionId as string,
            Member: req.user.id,
            Status: "booked"});
        
        return res.status(201).json({message: "Successfully booked session",
            booking:newBooking});

    } catch (err) {
        return res.status(500).json({error : "Error in the server: ", err});
    }
};

"get /myBookings" // member only
const getMemberBookings = async (req:Request, res:Response) => {
    try {
        const bookings = await Booking.find({Member: params.user.id}).populate("Session");
        if(!bookings){
            return res.status(404).json("No bookings");
        }
        return res.status(200).json(bookings);
    } catch (err) {
        return res.status(500).json({error : "Error in the server: ", err});
    }
};

"get /bookings" // member only
const getBookings = async (req:Request, res:Response) => {
    try {     
        const sessions = await classSession.find({ timeSlot: { $gt: new Date() } });
        
        if(sessions.length === 0){
            return res.status(404).json("No sessions available");
        }
        return res.status(200).json(sessions);
    } catch (err) {
        return res.status(500).json({error : "Error in the server: ", err});
    }
};



"patch /bookings/:bookingId" // member only
const cancelBooking = async (req:Request, res:Response) => {
    try {
        const booking = await Booking.findById(req.params.bookingId).populate("Session");
        if(!booking)
        {
            return res.status(404).json({message: "This booking is not found!"});
        }
        
        if(new Date() >= booking.Session.timeSlot)
        {
            return res.status(400).json({message: "Can't cancel this booking that has already started or finished"});
        }
        
        booking.Status = "cancelled";
        await booking.save();

        return res.status(200).json({message:"Successfully cancelled booking for this session: ",
                                     booking});
    } catch (err) {
        return res.status(500).json({error : "Error in the server: ", err});
    }
};

export {
    getBookings,
    bookSession,
    cancelBooking
};