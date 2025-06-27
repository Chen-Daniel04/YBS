import { Request, Response } from 'express';
import Bus from '../models/buses';

// Public: Get all buses with their current inferred locations
export const getAllBuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const buses = await Bus.find().populate('route', 'routeName routeNumber');
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch buses', error });
  }
};

// Public: Get bus by ID
export const getBusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bus = await Bus.findById(req.params.id).populate('route', 'routeName routeNumber');
    if (!bus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bus', error });
  }
};

// Admin: Create a new bus
export const createBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    const populatedBus = await Bus.findById(newBus._id).populate('route', 'routeName routeNumber');
    res.status(201).json(populatedBus);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create bus', error });
  }
};

// Admin: Update a bus
export const updateBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('route', 'routeName routeNumber');
    
    if (!updatedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update bus', error });
  }
};

// Admin: Delete a bus
export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      res.status(404).json({ message: 'Bus not found' });
      return;
    }
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete bus', error });
  }
}; 