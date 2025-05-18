// backend-boilerplate/src/api/admin/admin.controller.ts
import { Request, Response } from 'express';
import User from '../user/models/user.model';
import Product from '../store/models/product.model';
import Category from '../store/models/category.model';
import Role from '../user/models/role.model';
import Order from '../store/models/order.model';

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [userCount, productCount, categoryCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
    ]);

    res.json({
      users: userCount,
      products: productCount,
      categories: categoryCount,
    });
  } catch (err) {
    console.error('❌ Error in getDashboardStats:', err);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate('role', 'name');
    res.json(users);
  } catch (err) {
    console.error('❌ Error in getAllUsers:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    const role = await Role.findOne({ name: roleName });
    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }

    const updated = await User.findByIdAndUpdate(id, { role: role._id }, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ Error in updateUserRole:', err);
    res.status(500).json({ message: 'Failed to update role' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('❌ Error in deleteUser:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

export const getAllCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('❌ Error in getAllCategories:', err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error('❌ Error in createCategory:', err);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.error('❌ Error in updateCategory:', err);
    res.status(500).json({ message: 'Failed to update category' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error('❌ Error in deleteCategory:', err);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};

export const getAllOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error('❌ Error in getAllOrders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err) {
    console.error('❌ Error in updateOrderStatus:', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
