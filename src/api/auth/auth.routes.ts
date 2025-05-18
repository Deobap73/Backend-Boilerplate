// backend-boilerplate/src/api/auth/auth.routes.ts
import { Router } from 'express';
import { login, register, enable2FA } from './auth.controller';
import { requireRole } from '../../middlewares/requireRole';
import { protect } from '../../middlewares/protect';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/2fa/enable', protect, asyncHandler(enable2FA));

router.get('/admin-only', protect, requireRole('admin'), (req, res) => {
  res.json({ message: 'You are an admin!' });
});

export default router;
