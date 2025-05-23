// backend-boilerplate/src/api/user/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IRole } from './role.model';

export interface IUser extends Document {
  email: string;
  password: string;
  role: mongoose.Types.ObjectId | IRole;
  twoFactorEnabled: boolean;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null },
  twoFactorEnabled: { type: Boolean, default: false },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
