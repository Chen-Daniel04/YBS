import express from 'express';
import { loginAdmin, logoutAdmin, getAdminProfile } from '../controllers/adminAuthController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);

// Protected routes
router.post('/logout', protect, logoutAdmin);
router.get('/profile', protect, getAdminProfile);

export default router; 