import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type to include user payload
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
    return;
  }
  
  const token = authHeader.split(' ')[1] as string;
  const secret = process.env.JWT_SECRET as string;
  try {
    
    const decoded = jwt.verify(token, secret);
    req.user = decoded as { id: string; role: string };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid or expired token' });
  }
};

export const requireRole = (allowedRole: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    if (req.user.role !== allowedRole) {
      res.status(403).json({ message: 'Forbidden: insufficient permissions' });
      return;
    }

    next();
  };
};