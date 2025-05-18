// backend-boilerplate/src/api/media/routes/media.routes.ts
import { Router } from 'express';
import { uploadImage, deleteImage } from '../controllers/media.controller';
import { protect } from '../../../middlewares/protect';
import { requireRole } from '../../../middlewares/requireRole';
import { upload } from '../../../middlewares/upload';

const router = Router();

router.post('/upload', protect, requireRole('admin'), upload.single('image'), uploadImage);
router.delete('/:publicId', protect, requireRole('admin'), deleteImage);

export default router;
