// backend-boilerplate/src/middlewares/requireRole.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { IRole } from '../api/auth/role.model';

export const requireRole = (requiredRole: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role;

    if (
      !role ||
      typeof role === 'string' ||
      !('name' in role) ||
      (role as IRole).name !== requiredRole
    ) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  };
};
