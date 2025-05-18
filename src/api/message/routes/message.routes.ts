// backend-boilerplate/src/api/message/routes/message.routes.ts
import { Router } from 'express';
import { protect } from '../../../middlewares/protect';
import {
  sendMessage,
  getMessagesWithUser,
  markMessageAsRead,
} from '../controllers/message.controller';

const router = Router();

router.use(protect);

router.post('/', sendMessage);
router.get('/', getMessagesWithUser);
router.patch('/:id/read', markMessageAsRead);

export default router;
