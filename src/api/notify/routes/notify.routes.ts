// backend-boilerplate/src/api/notify/routes/notify.routes.ts
import { Router } from 'express';
import { protect } from '../../../middlewares/protect';
import {
  getMyNotifications,
  markNotificationRead,
  deleteNotification,
} from '../controllers/notify.controller';

const router = Router();

router.use(protect);

router.get('/', getMyNotifications);
router.patch('/:id/read', markNotificationRead);
router.delete('/:id', deleteNotification);

export default router;
