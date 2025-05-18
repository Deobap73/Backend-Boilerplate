// src/types/express/index.d.ts
import { IUser } from '../../api/auth/user.model';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}
