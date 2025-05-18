// backend-boilerplate/src/utils/issueTokens.ts
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const issueTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '15m' });

  const refreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};
