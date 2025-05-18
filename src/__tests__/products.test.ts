// backend-boilerplate/src/__tests__/products.test.ts
import request from 'supertest';
import app from '../server'; // certifique-se que exporta a instância app no server.ts

describe('GET /api/products', () => {
  it('should return 200 and an array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });
});
