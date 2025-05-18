// src/types/AuthRequest.ts

import { Request } from 'express';
import { IUser } from '../api/user/models/user.model';

export interface AuthRequest extends Request {
  user?: IUser;
}
