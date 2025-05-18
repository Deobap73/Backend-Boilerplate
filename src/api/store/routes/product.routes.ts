// backend-boilerplate/src/api/store/routes/product.routes.ts
import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { protect } from '../../../middlewares/protect';
import { requireRole } from '../../../middlewares/requireRole';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, requireRole('admin'), createProduct);
router.put('/:id', protect, requireRole('admin'), updateProduct);
router.delete('/:id', protect, requireRole('admin'), deleteProduct);

export default router;
