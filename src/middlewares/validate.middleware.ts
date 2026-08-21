import type { Request, Response, NextFunction } from 'express';

export const validateCreateSession = (req: Request, res: Response, next: NextFunction) => {
  const { className, capacity, startTime } = req.body;

  if (!className || capacity === undefined || !startTime) { 
    return res.status(400).json({message: 'All fields are required!!!!'});
  }

  const startDate = new Date(startTime);
  if (isNaN(startDate.getTime())) {
    return res.status(400).json({ message: 'Invalid start time format' });
  }

  if (startDate < new Date()) {
    return res.status(400).json({ message: 'Start time must be in the future' });
  }

  if (!Number.isInteger(capacity) || capacity <= 0) {
    return res.status(400).json({ message: 'Capacity must be a positive integer' });
  }
  next();
};

export const validateUpdateSession = (req: Request, res: Response, next: NextFunction) => {
    const { startTime, capacity } = req.body;

    if (startTime !== undefined) 
    {
        const date = new Date(startTime);
        if (isNaN(date.getTime())) return res.status(400).json({ message: 'Invalid start time format' });
        if (date < new Date()) return res.status(400).json({ message: 'Setting a date in the past is not allowed' });
    }

    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity <= 0)) {
    return res.status(400).json({ message: 'Capacity must be a positive integer' });
    }

    next();
};