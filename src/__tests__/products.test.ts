// backend-boilerplate/src/__tests__/products.test.ts
import request from 'supertest';
import app from '../app';
import Product from '../api/store/models/product.model';
import Category from '../api/store/models/category.model';
import { Types } from 'mongoose';

let categoryId: Types.ObjectId;

beforeEach(async () => {
  const category = await Category.create({ name: 'Test Category', description: 'Test' });
  categoryId = category._id as Types.ObjectId;
  await Product.insertMany([
    { name: 'Product 1', price: 10, stock: 5, category: categoryId },
    { name: 'Product 2', price: 20, stock: 10, category: categoryId },
    { name: 'Product 3', price: 5, stock: 3, category: categoryId },
    { name: 'Product 4', price: 50, stock: 1, category: categoryId },
  ]);
});

describe('GET /api/products', () => {
  it('should return 200 and a list of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  it('should return products filtered by category', async () => {
    const res = await request(app).get(`/api/products?category=${categoryId}`);
    expect(res.status).toBe(200);
    expect(res.body.products.every((p: any) => p.category._id === categoryId.toString())).toBe(
      true
    );
  });

  it('should return products with maxPrice filter', async () => {
    const res = await request(app).get('/api/products?maxPrice=15');
    expect(res.status).toBe(200);
    expect(res.body.products.every((p: any) => p.price <= 15)).toBe(true);
  });

  it('should return paginated results', async () => {
    const res = await request(app).get('/api/products?page=1&limit=2');
    expect(res.status).toBe(200);
    expect(res.body.products.length).toBeLessThanOrEqual(2);
    expect(typeof res.body.totalCount).toBe('number');
    expect(typeof res.body.totalPages).toBe('number');
    expect(res.body.currentPage).toBe(1);
  });
});
