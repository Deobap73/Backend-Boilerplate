// backend-boilerplate/src/api/message/validators/message.validator.ts
import { body } from 'express-validator';

export const sendMessageValidator = [
  body('receiver').isMongoId().withMessage('Receiver must be a valid user ID'),
  body('text').isString().notEmpty().withMessage('Message text is required'),
];
