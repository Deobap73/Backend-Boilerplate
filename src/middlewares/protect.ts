import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../api/user/models/user.model';
import { config } from '../config/env';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId).populate('role').select('-password');

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
