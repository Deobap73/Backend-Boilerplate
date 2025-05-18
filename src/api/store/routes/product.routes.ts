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
import { upload } from '../../../middlewares/upload';
import { createProductValidator, updateProductValidator } from '../validators/product.validator';
import { validate } from '../../../middlewares/validate';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post(
  '/',
  protect,
  requireRole('admin'),
  upload.single('image'),
  createProductValidator,
  validate,
  createProduct
);
router.put('/:id', protect, requireRole('admin'), updateProductValidator, validate, updateProduct);
router.delete('/:id', protect, requireRole('admin'), deleteProduct);

export default router;
