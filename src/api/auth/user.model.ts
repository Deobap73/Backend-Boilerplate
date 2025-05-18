// backend-boilerplate/src/api/auth/user.model.ts (com role e 2FA)
import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IRole } from './role.model';

export interface IUser extends Document {
  email: string;
  password: string;
  role?: IRole | Types.ObjectId;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
