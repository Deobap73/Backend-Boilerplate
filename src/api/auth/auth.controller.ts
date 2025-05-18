// backend-boilerplate/src/api/auth/auth.controller.ts
import { Request, Response } from 'express';
import User from './user.model';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { generateTwoFactorSecret, verifyTwoFactorToken } from './twoFactor.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, token } = req.body;
  try {
    const user = await User.findOne({ email }).populate('role');
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (user.twoFactorEnabled) {
      if (!token || !user.twoFactorSecret || !verifyTwoFactorToken(user.twoFactorSecret, token)) {
        res.status(401).json({ message: '2FA token required or invalid', twoFactorRequired: true });
        return;
      }
    }

    const accessToken = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, config.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const enable2FA = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user?.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const secret = generateTwoFactorSecret(user.email);
  user.twoFactorSecret = secret.ascii;
  user.twoFactorEnabled = true;
  await user.save();

  res.json({ message: '2FA enabled', otpauthUrl: secret.otpauth_url });
};
