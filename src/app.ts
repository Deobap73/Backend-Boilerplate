// backend-boilerplate/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/env';
import { connectToDB } from './config/db';
import authRoutes from './api/auth/auth.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Global middlewares
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

// Error middleware
app.use(errorHandler);

// Connect DB
connectToDB();

export default app;
