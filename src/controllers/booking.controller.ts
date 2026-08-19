import type  { Request , Response } from 'express';
import {Booking} from "../models/booking.model";
import {classSession} from "../models/classSession.model";


const bookSession = async (req:Request, res:Response) => {
    try {
        const sessionId = req.params.sessionId as string;
        const userId = req.user?.id as string;

        const session = await classSession.findById(sessionId);
        if(!session)
        {
            return res.status(404).json( "The session was not found");
        }

        if(new Date() >= session.startTime)
        {
            return res.status(400).json({message: "Can't book this booking that has already started or finished"});
        }

        const existingBooking = await Booking.findOne(
            {Member: userId,
             Session: sessionId,
             Status: "booked"}
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
            Session: sessionId,
            Member: userId,
            Status: "booked"});
        
        return res.status(201).json(
            {message: "Successfully booked session",
            booking:newBooking});

    } catch (err) {
        return res.status(500).json({error : "Error in the server: ", err});
    }
};

const getMemberBookings = async (req:Request, res:Response) => {
    try {
        const userId = req.user?.id as string;
        const bookings = await Booking.find({Member: userId}).populate("Session");
        if(bookings.length === 0){
            return res.status(404).json("No bookings");
        }
        return res.status(200).json(bookings);
    } catch (err) {
        return res.status(500).json({error : "Error in the server: ", err});
    }
};


const cancelBooking = async (req:Request, res:Response) => {
    try {
        const bookingId = req.params.bookingId as string;
        const userId = req.user?.id as string; 
        const booking = await Booking.findById(bookingId).populate("Session");
        if(!booking)
        {
            return res.status(404).json({message: "This booking is not found!"});
        }
        const session = booking.Session as any; //bypass ts safety checker to allow the use of session.startTime
        if(new Date() >= new Date(session.startTime)) //probable future bug, keep an eye out
        {
            return res.status(400).json({message: "Can't cancel this booking that has already started or finished"});
        }

        if (booking.Member.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized: You can only cancel your own bookings" });
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
    getMemberBookings,
    bookSession,
    cancelBooking
};