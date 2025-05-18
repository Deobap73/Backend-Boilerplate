// backend-boilerplate/src/api/auth/role.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: 'admin' | 'user' | 'editor';
  permissions: string[];
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
});

export default mongoose.model<IRole>('Role', RoleSchema);
