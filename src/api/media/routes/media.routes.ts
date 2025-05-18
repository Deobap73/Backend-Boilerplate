// backend-boilerplate/src/api/media/routes/media.routes.ts
import { Router } from 'express';
import { uploadImage, deleteImage } from '../controllers/media.controller';
import { protect } from '../../../middlewares/protect';
import { requireRole } from '../../../middlewares/requireRole';
import { upload } from '../../../middlewares/upload';

const router = Router();

/**
 * @swagger
 * /api/media/upload:
 *   post:
 *     summary: Upload an image (admin only)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Upload failed
 *
 * /api/media/{publicId}:
 *   delete:
 *     summary: Delete an image by publicId (admin only)
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted
 *       404:
 *         description: Image not found
 */
router.post('/upload', protect, requireRole('admin'), upload.single('image'), uploadImage);
router.delete('/:publicId', protect, requireRole('admin'), deleteImage);

export default router;
