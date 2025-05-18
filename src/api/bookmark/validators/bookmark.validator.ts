// backend-boilerplate/src/api/bookmark/validators/bookmark.validator.ts
import { body } from 'express-validator';

export const addBookmarkValidator = [
  body('item').isMongoId().withMessage('Item ID must be a valid Mongo ID'),
  body('type').isIn(['product', 'post']).withMessage("Type must be either 'product' or 'post'"),
];
