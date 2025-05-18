// backend-boilerplate/src/api/message/routes/message.routes.ts
import { Router } from 'express';
import { protect } from '../../../middlewares/protect';
import {
  sendMessage,
  getMessagesWithUser,
  markMessageAsRead,
} from '../controllers/message.controller';
import { validate } from '../../../middlewares/validate';
import { sendMessageValidator } from '../validators/message.validator';

const router = Router();

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get messages with a specific user (conversation thread)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of messages with the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing or invalid user ID
 *
 *   post:
 *     summary: Send a message to a specific user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientId
 *               - text
 *             properties:
 *               recipientId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Validation error
 *
 * /api/messages/{id}/read:
 *   patch:
 *     summary: Mark a specific message as read
 *     tags: [Messages]
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
 *         description: Message marked as read
 *       404:
 *         description: Message not found
 */
router.use(protect);

router.post('/', sendMessageValidator, validate, sendMessage);
router.get('/', getMessagesWithUser);
router.patch('/:id/read', markMessageAsRead);

export default router;
