import { Router } from 'express';
import {
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus
} from '../controllers/busController';
import { protect as adminAuthMiddleware } from '../middleware/authMiddleware';

const router: Router = Router();

// Public endpoints
router.get('/', getAllBuses);
router.get('/:id', getBusById);

// Admin endpoints (protected)
router.post('/', adminAuthMiddleware, createBus);
router.put('/:id', adminAuthMiddleware, updateBus);
router.delete('/:id', adminAuthMiddleware, deleteBus);

export default router; 