// backend-boilerplate/src/api/notify/routes/notify.routes.ts
import { Router } from 'express';
import { protect } from '../../../middlewares/protect';
import {
  getMyNotifications,
  markNotificationRead,
  deleteNotification,
} from '../controllers/notify.controller';
import { validate } from '../../../middlewares/validate';
import { createNotificationValidator } from '../validators/notify.validator';

const router = Router();

router.use(protect);

router.get('/', getMyNotifications);
router.patch('/:id/read', markNotificationRead);
router.delete('/:id', deleteNotification);

// (⚠️ Example: Future manual notification creation route)
// router.post('/', createNotificationValidator, validate, createNotification);

export default router;
