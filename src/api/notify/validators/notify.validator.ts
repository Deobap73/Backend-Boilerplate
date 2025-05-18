// backend-boilerplate/src/api/notify/validators/notify.validator.ts
import { body } from 'express-validator';

export const createNotificationValidator = [
  body('user').isMongoId().withMessage('User must be a valid ID'),
  body('message').isString().notEmpty().withMessage('Message is required'),
];
