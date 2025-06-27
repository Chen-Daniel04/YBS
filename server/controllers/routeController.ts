import { Request, Response } from 'express';
import Route from '../models/routes';

// Public: Get all routes
export const getAllRoutes = async (req: Request, res: Response): Promise<void> => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch routes', error });
  }
};

// Public: Get route by ID
export const getRouteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      res.status(404).json({ message: 'Route not found' });
      return;
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch route', error });
  }
};

// Public: Get route by routeNumber
export const getRouteByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const route = await Route.findOne({ routeNumber: req.params.routeNumber });
    if (!route) {
      res.status(404).json({ message: 'Route not found' });
      return;
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch route', error });
  }
};

// Public: Get stops for a route
export const getStopsForRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      res.status(404).json({ message: 'Route not found' });
      return;
    }
    res.json(route.stops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stops', error });
  }
};

// Admin: Create a new route
export const createRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const newRoute = new Route(req.body);
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create route', error });
  }
};

// Admin: Update a route
export const updateRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoute) {
      res.status(404).json({ message: 'Route not found' });
      return;
    }
    res.json(updatedRoute);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update route', error });
  }
};

// Admin: Delete a route
export const deleteRoute = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) {
      res.status(404).json({ message: 'Route not found' });
      return;
    }
    res.json({ message: 'Route deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete route', error });
  }
}; 