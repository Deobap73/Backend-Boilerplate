// backend-boilerplate/src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/env';
import authRoutes from './api/auth/auth.routes';
import adminRoutes from './api/admin/admin.routes';
import productRoutes from './api/store/routes/product.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import { setupSwagger } from './docs/swagger';

// ✅ Ensure all models are registered before routes
import './api/store/models/category.model';

const app = express();
setupSwagger(app);

// Global middlewares
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

console.log('✅ App file executed');

export default app;
