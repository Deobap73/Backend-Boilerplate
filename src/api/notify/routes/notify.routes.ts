// backend-boilerplate/src/api/notify/routes/notify.routes.ts
import { Router } from 'express';
import {
  getMyNotifications,
  markNotificationRead,
  deleteNotification,
} from '../controllers/notify.controller';
import { protect } from '../../../middlewares/protect';

const router = Router();

/**
 * @swagger
 * /api/notify:
 *   get:
 *     summary: Get notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *
 * /api/notify/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 *
 * /api/notify/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 */
router.get('/', protect, getMyNotifications);
router.put('/:id/read', protect, markNotificationRead);
router.delete('/:id', protect, deleteNotification);

export default router;
