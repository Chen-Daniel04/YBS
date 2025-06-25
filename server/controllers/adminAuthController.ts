import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';

// Generate JWT token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// Login Admin
export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password required' });
    return;
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const token = generateToken(admin._id);
  const { _id, name } = admin;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      admin: { _id, name, email },
      token
    },
  });
};

// Logout Admin
export const logoutAdmin = (req: Request, res: Response): void => {
  res.status(200).json({ success: true, message: 'Logout successful' });
};

// Get Admin Profile
export const getAdminProfile = async (req: Request, res: Response): Promise<void> => {
  const admin = await Admin.findById((req as any).admin?._id).select('-password');

  if (!admin) {
    res.status(404).json({ success: false, message: 'Admin not found' });
    return;
  }

  res.status(200).json({
    success: true,
    data: { admin },
  });
};
