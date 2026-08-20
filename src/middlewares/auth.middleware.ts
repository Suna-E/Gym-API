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

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
  
  const secret = process.env.JWT_SECRET as string;
  try {
    
    const decoded = jwt.verify(token, secret);
    req.user = decoded as { id: string; role: string };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
  }
};

export const requireRole = (allowedRole: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (req.user.role !== allowedRole) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
};
