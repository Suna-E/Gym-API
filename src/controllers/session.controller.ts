import type  { Request , Response } from 'express';
import { classSession } from '../models/classSession.model';
import { Booking } from '../models/booking.model'; //////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const CreateSession = async (req: Request, res: Response) => {
  try {
    const { className, trainer, capacity, startTime} = req.body;

    const startDate = new Date(startTime);
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: 'Invalid start time format' });
    }
    if (!className || !trainer || !capacity || !startTime) { 
      return res.status(400).json({ message: 'All fields are required!!!!' });
    }
    if (new Date(startTime) < new Date()) {
      return res.status(400).json({ message: ' BE CAREFUL ! Start time must be in the future' });
    }
    if (!Number.isInteger(capacity) || capacity <= 0) {
      return res.status(400).json({ message: 'Capacity must be a positive integer' });
    }
      const session = await classSession.create({
        className,
        trainer,
        startTime,
        capacity
      });
      res.status(201).json({ message: ' CONGRATULATIONS!!!  Your  Class session is succesfully created ', session });
    } 
      catch (error: any) {
      res.status(500).json({ message: "SORRY! Something went wrong while creating the session: " });
    }
};



export const UpdateSession = async (req: Request, res: Response) => {
  try {
    const { id} = req.params;
    const { className, trainer, startTime, capacity } = req.body;
    const trainerId = (req as any).user.id;          //////////////////////////////////////////////////////////////////////////////////////////must be handled   

    const session = await classSession.findById(id);


    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }                                                                                           ////////////////////////////////////////////////////////////////////////////////////////
     if (session.trainer.toString() !== trainerId.toString()) {
      return res.status(403).json({ message: 'You can only update your own sessions' });
    }
 
    const newStart = startTime ? new Date(startTime) : session.startTime;


    if (new Date() > newStart) {
      return res.status(400).json({ message: 'setting a date in the past is not allowed' });
    } 
    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity < session.capacity)) {
      return res.status(400).json({ message: 'Capacity cannot be less than current attendees' });
    }

        if (className) session.className = className;
        if (trainer) session.trainer = trainer;
        session.startTime = startTime;
        session.capacity = capacity;

        await session.save();
        res.status(200).json({ message: 'Session updated successfully', session });
  }
  
  catch (error: any) {
    res.status(500).json({ message: "SORRY! Something went wrong while updating the session: "  });
  }
};




export const DeleteSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trainerId = (req as any).user.id;
 
    if (!trainerId) {
      return res.status(400).json({ message: 'Unauthorized' });
    }
 
    const session = await classSession.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Class session not found' });
    }
    if (session.trainer.toString() !== trainerId.toString()) {
      return res.status(400).json({ message: 'You can only delete your own sessions' });
    }
 
    const activeBookingsCount = await Booking.countDocuments({
      session: id,
      status: 'booked',
    });
 
    if (activeBookingsCount > 0) {
      return res.status(409).json({
        message: `Cannot delete session, it has ${activeBookingsCount} active booking(s)`,
      });
    }
    await session.deleteOne();
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'SORRY! Something went wrong while deleting the session' });
  }
};
