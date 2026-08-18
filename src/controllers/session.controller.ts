import type  { Request , Response } from 'express';
import { ClassSession } from '../models/classSession.model.js';
import { Booking } from '../models/booking.model.js'; //////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const CreateSession = async (req: Request, res: Response) => {
  try {
    const { className, instructor, startTime, endTime, capacity } = req.body;
    const attendees:string[] = []; 




    if (!className || !instructor || !startTime || !endTime || !capacity) {
      return res.status(400).json({ message: 'All fields are required!!!!' });
    }

    if (new Date(startTime) < new Date()) {
      return res.status(400).json({ message: ' BE CAREFUL ! Start time must be in the future' });
    }

    if (new Date(endTime) < new Date(startTime)) {
      return res.status(400).json({ message: ' BE CAREFUL ! End time must be after the start time' });
    }
    if (!Number.isInteger(capacity) || capacity <= 0) {
  return res.status(400).json({ message: 'Capacity must be a positive integer' });
}

    const session = await ClassSession.create({
      className: className,
      instructor: instructor,
      startTime: startTime,
      endTime: endTime,
      capacity: capacity,
      attendees: attendees
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
    const { className, instructor, startTime, endTime, capacity } = req.body;
    const trainerId = (req as any).user.id;          //////////////////////////////////////////////////////////////////////////////////////////must be handled   

    const session = await ClassSession.findById(id);


    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }                                                                                           ////////////////////////////////////////////////////////////////////////////////////////
     if (session.instructor.toString() !== trainerId.toString()) {
      return res.status(403).json({ message: 'You can only update your own sessions' });
    }
 
    const newStart = startTime ? new Date(startTime) : session.startTime;
    const newEnd = endTime ? new Date(endTime) : session.endTime;


if (newEnd <= newStart) {
  return res.status(400).json({ message: 'End time must be after start time' });
    } 
  

    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity < session.attendees.length)) {
      return res.status(400).json({ message: 'Capacity cannot be less than current attendees' });
    }

    if (className) session.className = className;
    if (instructor) session.instructor = instructor;
    if (startTime) session.startTime = startTime;
    if (endTime) session.endTime = endTime;
    if (capacity !== undefined) session.capacity = capacity;

    await session.save();
    res.status(200).json({ message: 'Session updated successfully', session });
  }
  



  
  catch (error: any) {
      console.error(error); 
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
 
    const session = await ClassSession.findById(id);
 
    if (!session || session.isDeleted) {
      return res.status(404).json({ message: 'Session not found' });
    }
 
    if (session.instructor.toString() !== trainerId.toString()) {
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
                   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////bonus point must be handled ا
    session.isDeleted = true;
    await session.save();
 
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'SORRY! Something went wrong while deleting the session' });
  }
};