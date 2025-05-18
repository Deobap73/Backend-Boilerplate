// backend-boilerplate/src/api/message/controllers/message.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../../../types/AuthRequest';
import Message from '../models/message.model';

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const message = await Message.create({
      sender: req.user!._id,
      receiver: req.body.receiver,
      text: req.body.text,
    });
    res.status(201).json(message);
  } catch (err) {
    console.error('❌ Error in sendMessage:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

export const getMessagesWithUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const withUserId = req.query.with as string;
    if (!withUserId) {
      res.status(400).json({ message: 'Missing user ID in query' });
      return;
    }

    const messages = await Message.find({
      $or: [
        { sender: req.user!._id, receiver: withUserId },
        { sender: withUserId, receiver: req.user!._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error('❌ Error in getMessagesWithUser:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

export const markMessageAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updated = await Message.findOneAndUpdate(
      { _id: req.params.id, receiver: req.user!._id },
      { read: true },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ message: 'Message not found or unauthorized' });
      return;
    }
    res.json(updated);
  } catch (err) {
    console.error('❌ Error in markMessageAsRead:', err);
    res.status(500).json({ message: 'Failed to update message' });
  }
};
