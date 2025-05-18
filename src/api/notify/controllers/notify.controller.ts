// backend-boilerplate/src/api/notify/controllers/notify.controller.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../../../types/AuthRequest';
import Notification from '../models/notification.model';

export const getMyNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find({ user: req.user!._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('❌ Error in getMyNotifications:', err);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

export const markNotificationRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user!._id },
      { read: true },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }
    res.json(updated);
  } catch (err) {
    console.error('❌ Error in markNotificationRead:', err);
    res.status(500).json({ message: 'Failed to update notification' });
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user!._id,
    });
    if (!deleted) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    console.error('❌ Error in deleteNotification:', err);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
};
