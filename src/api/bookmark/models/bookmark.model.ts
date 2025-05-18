// backend-boilerplate/src/api/bookmark/models/bookmark.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  user: mongoose.Types.ObjectId;
  item: mongoose.Types.ObjectId;
  type: 'product' | 'post';
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ['product', 'post'], required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
