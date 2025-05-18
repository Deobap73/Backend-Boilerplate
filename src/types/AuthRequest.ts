// src/types/AuthRequest.ts

import { Request } from 'express';
import { IUser } from '../api/auth/user.model';

export interface AuthRequest extends Request {
  user?: IUser;
}
