// backend-boilerplate/src/config/env.ts

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'defaultsecret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

  // ✅ Cloudinary Configuration
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET || '',
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || '',
};
