// backend-boilerplate/src/api/store/controllers/product.controller.ts
import { Request, Response } from 'express';
import Product from '../models/product.model';
import { v2 as cloudinary } from 'cloudinary';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const createProduct = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    let imageUrl = '';

    if (req.file) {
      const result = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error || !result) return reject('Upload failed');
            resolve(result.secure_url);
          }
        );

        if (req.file && req.file.buffer) {
          stream.end(req.file.buffer);
        }
      });

      imageUrl = result;
    }

    const product = await Product.create({ ...req.body, image: imageUrl });
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Error in createProduct:', err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('🔥 Inside getProducts');

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filters: Record<string, any> = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.minPrice) filters.price = { ...filters.price, $gte: Number(req.query.minPrice) };
    if (req.query.maxPrice) filters.price = { ...filters.price, $lte: Number(req.query.maxPrice) };
    if (req.query.search) {
      filters.name = { $regex: req.query.search, $options: 'i' };
    }

    const totalCount = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / limit);

    const products = await Product.find(filters).populate('category').skip(skip).limit(limit);

    res.json({ products, totalCount, totalPages, currentPage: page });
  } catch (err) {
    console.error('❌ Error in getProducts:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error('❌ Error in getProductById:', err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error('❌ Error in updateProduct:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('❌ Error in deleteProduct:', err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
