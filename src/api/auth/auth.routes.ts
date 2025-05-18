// backend-boilerplate/src/api/auth/auth.routes.ts
import { Router } from 'express';
import { login, register, enable2FA } from './auth.controller';
import { requireRole } from '../../middlewares/requireRole';
import { protect } from '../../middlewares/protect';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and obtain access & refresh tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               token:
 *                 type: string
 *                 description: Optional 2FA token
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials or missing 2FA
 */
router.post('/login', asyncHandler(login));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/register', asyncHandler(register));

router.post('/2fa/enable', protect, asyncHandler(enable2FA));

router.get('/admin-only', protect, requireRole('admin'), (req, res) => {
  res.json({ message: 'You are an admin!' });
});

export default router;
