// backend-boilerplate/src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'defaultsecret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};
