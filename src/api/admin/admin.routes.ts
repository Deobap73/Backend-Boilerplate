// backend-boilerplate/src/api/admin/admin.routes.ts
import { Router } from 'express';
import { protect } from '../../middlewares/protect';
import { requireRole } from '../../middlewares/requireRole';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  updateOrderStatus,
} from './admin.controller';

const router = Router();

// Protection for all admin routes
router.use(protect);
router.use(requireRole('admin'));

router.get('/health', (_req, res) => {
  res.json({ message: 'Admin routes protected and healthy' });
});

router.get('/stats', getDashboardStats);

// Users
router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Categories
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

export default router;
