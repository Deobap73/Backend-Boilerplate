// backend-boilerplate/src/api/store/routes/order.routes.ts
import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller';
import { protect } from '../../../middlewares/protect';
import { requireRole } from '../../../middlewares/requireRole';

const router = Router();

router.get('/', protect, requireRole('admin'), getOrders);
router.get('/:id', protect, requireRole('admin'), getOrderById);
router.post('/', protect, createOrder);
router.put('/:id', protect, requireRole('admin'), updateOrder);
router.delete('/:id', protect, requireRole('admin'), deleteOrder);

export default router;
