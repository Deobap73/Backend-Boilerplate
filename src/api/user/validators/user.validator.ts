// backend-boilerplate/src/api/user/validators/user.validator.ts
import { body, param } from 'express-validator';

export const userIdParamValidator = [param('id').isMongoId().withMessage('Invalid user ID')];

export const userCreationValidator = [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
