// backend-boilerplate/src/api/bookmark/controllers/bookmark.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../../../types/AuthRequest';
import Bookmark from '../models/bookmark.model';

export const getBookmarks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user!._id }).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error('❌ Error in getBookmarks:', err);
    res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
};

export const addBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const exists = await Bookmark.findOne({
      user: req.user!._id,
      item: req.body.item,
      type: req.body.type,
    });
    if (exists) {
      res.status(409).json({ message: 'Already bookmarked' });
      return;
    }

    const bookmark = await Bookmark.create({
      user: req.user!._id,
      item: req.body.item,
      type: req.body.type,
    });
    res.status(201).json(bookmark);
  } catch (err) {
    console.error('❌ Error in addBookmark:', err);
    res.status(500).json({ message: 'Failed to add bookmark' });
  }
};

export const removeBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deleted = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user!._id,
    });
    if (!deleted) {
      res.status(404).json({ message: 'Bookmark not found' });
      return;
    }
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    console.error('❌ Error in removeBookmark:', err);
    res.status(500).json({ message: 'Failed to delete bookmark' });
  }
};
