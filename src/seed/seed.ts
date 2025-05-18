// backend-boilerplate/src/seed/seed.ts
import mongoose from 'mongoose';
import User from '../api/user/models/user.model';
import Role from '../api/user/models/role.model';
import Category from '../api/store/models/category.model';
import Product from '../api/store/models/product.model';
import { config } from '../config/env';
import bcrypt from 'bcryptjs';

async function seed() {
  await mongoose.connect(config.MONGO_URI);

  console.log('🌱 Starting database seeding...');

  await User.deleteMany({});
  await Role.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});

  const adminRole = await Role.create({ name: 'admin', permissions: ['*'] });

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await User.create({
    email: 'admin@example.com',
    password: hashedPassword,
    role: adminRole._id,
    twoFactorEnabled: false,
  });

  const categories = await Category.insertMany([
    { name: 'Books', description: 'Books and literature' },
    { name: 'Electronics', description: 'Gadgets and devices' },
    { name: 'Clothing', description: 'Apparel and accessories' },
  ]);

  await Product.insertMany([
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 29.99,
      stock: 100,
      category: categories[1]._id,
      image: 'https://example.com/mouse.jpg',
    },
    {
      name: 'Cotton T-Shirt',
      description: '100% cotton white t-shirt',
      price: 14.99,
      stock: 200,
      category: categories[2]._id,
      image: 'https://example.com/shirt.jpg',
    },
    {
      name: 'Classic Novel',
      description: 'A timeless classic piece of literature',
      price: 9.99,
      stock: 150,
      category: categories[0]._id,
      image: 'https://example.com/book.jpg',
    },
  ]);

  console.log('✅ Seeding completed. Admin user: admin@example.com / admin123');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
