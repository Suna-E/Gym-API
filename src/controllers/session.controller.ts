import type  { Request , Response } from 'express';
import { classSession } from '../models/classSession.model';
import { Booking } from '../models/booking.model';


export const CreateSession = async (req: Request, res: Response) => {
  try {
    const { className, trainer, capacity, startTime} = req.body;

    const session = await classSession.create({
      className,
      trainer,
      startTime,
      capacity
    });
      res.status(201).json({ message: 'Your Class session is succesfully created', session });
    } 
      catch (error: any) {
      res.status(500).json({ message: "Something went wrong while creating the session" });
    }
};

export const UpdateSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;
    const { className, trainer, startTime, capacity } = req.body;
    const trainerId = req.user?.id as string;
    
    const session = await classSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    } 
    if (session.trainer.toString() !== trainerId.toString()) {
      return res.status(400).json({ message: 'You can only update your own sessions' });
    }

    const activeBookingsCount = await Booking.countDocuments({
        session: sessionId,
        status: 'booked'
    });

    if (capacity !== undefined && capacity < activeBookingsCount) 
    {
      return res.status(400).json({ message: `Capacity cannot be less than current active bookings: ${activeBookingsCount}`})
    };

      if (className) session.className = className;
      if (trainer) session.trainer = trainer;
      if (startTime)session.startTime = new Date(startTime);
      if (capacity !== undefined) session.capacity = capacity;

      await session.save();
      res.status(200).json({ message: 'Session updated successfully', session });
  }
  
  catch (error: any) {
    res.status(500).json({ message: "Something went wrong while updating the session" });
  }
};


export const DeleteSession = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.id;
    const trainerId = req.user?.id as string;
 
    const session = await classSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Class session not found' });
    }
    if (session.trainer.toString() !== trainerId.toString()) {
      return res.status(400).json({ message: 'You can only delete your own sessions' });
    }
 
    const activeBookingsCount = await Booking.countDocuments({
      session: sessionId,
      status: 'booked',
    });
 
    if (activeBookingsCount > 0) {
      return res.status(400).json({
        message: `Cannot delete session, it has ${activeBookingsCount} active booking(s)`,
      });
    }
    await session.deleteOne();
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong while deleting the session' });
  }
};






export const GetAllSessions = async (req: Request, res: Response) => {
  try {
    
    let className = req.query.className;
    let day = req.query.day;
    let trainerName = req.query.trainer;
    let availability = req.query.availability;

    
    let filter: any = {};

    if (className) {
  filter.className = className;
}

    if (day) {
      let startDay = new Date(day as string);
      startDay.setHours(0, 0, 0, 0);

      let endDay = new Date(day as string);
      endDay.setHours(23, 59, 59, 999);

      filter.startTime = { $gte: startDay, $lte: endDay };
    }

let sessions = await classSession.find(filter).populate('trainer', 'fullName email');

    if (trainerName) {
      let searchName = (trainerName as string).toLowerCase();

      sessions = sessions.filter((session: any) => {
        let trainerFullName = session.trainer.fullName.toLowerCase();
        return trainerFullName.includes(searchName);
      });
    }

 
    if (availability === 'true') {
      
      let sessionsWithSpace = [];

      for (let i = 0; i < sessions.length; i++) {
        let currentSession: any = sessions[i];

        let bookedCount = await Booking.countDocuments({
          session: currentSession._id,
          status: 'booked',
        });

        let spotsRemaining = currentSession.capacity - bookedCount;

        if (spotsRemaining > 0) {
          sessionsWithSpace.push(currentSession);
        }
      }

      sessions = sessionsWithSpace;
    }


    res.status(200).json({ count: sessions.length, sessions: sessions });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong while getting  sessions' });
  }
};