import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';

// Protect routes - verify JWT token
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;
      const admin = await Admin.findById(decoded.id).select('-password');

      if (!admin) {
        res.status(401).json({ success: false, message: 'Not authorized, admin not found' });
        return;
      }

      (req as any).admin = admin;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
      return;
    }
  } else {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
    return;
  }
}; 