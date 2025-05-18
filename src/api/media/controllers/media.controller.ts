// backend-boilerplate/src/api/media/controllers/media.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../../../types/AuthRequest';
import cloudinary from '../../../utils/cloudinary';

export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No image provided' });
      return;
    }

    const streamUpload = () => {
      return new Promise<{ secure_url: string; public_id: string; format: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: process.env.CLOUDINARY_FOLDER || 'backend-boilerplate',
              resource_type: 'image',
            },
            (error, result) => {
              if (error || !result) return reject(error || new Error('Upload failed'));
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
                format: result.format,
              });
            }
          );
          stream.end(req.file!.buffer);
        }
      );
    };

    const uploaded = await streamUpload();
    res.status(201).json(uploaded);
  } catch (err) {
    console.error('❌ Error in uploadImage:', err);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

export const deleteImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const publicId = req.params.publicId;
    if (!publicId) {
      res.status(400).json({ message: 'Missing publicId' });
      return;
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    if (result.result !== 'ok') {
      res.status(400).json({ message: 'Failed to delete image' });
      return;
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('❌ Error in deleteImage:', err);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};
