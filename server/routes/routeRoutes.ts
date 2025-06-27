import { Router } from 'express';
import {
  getAllRoutes,
  getRouteById,
  getRouteByNumber,
  getStopsForRoute,
  createRoute,
  updateRoute,
  deleteRoute
} from '../controllers/routeController';
import { protect as adminAuthMiddleware } from '../middleware/authMiddleware';

const router: Router = Router();

// Public endpoints
router.get('/', getAllRoutes);
router.get('/number/:routeNumber', getRouteByNumber);
router.get('/:id/stops', getStopsForRoute);
router.get('/:id', getRouteById);


// Admin endpoints
router.post('/', adminAuthMiddleware, createRoute);
router.put('/:id', adminAuthMiddleware, updateRoute);
router.delete('/:id', adminAuthMiddleware, deleteRoute);

export default router; 