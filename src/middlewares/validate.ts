// backend-boilerplate/src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import validator from 'express-validator';

const { validationResult } = validator;

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
