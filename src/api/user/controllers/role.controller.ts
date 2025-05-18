// backend-boilerplate/src/api/user/controllers/role.controller.ts
import { Request, Response } from 'express';
import Role from '../models/role.model';

export const getRoles = async (req: Request, res: Response) => {
  const roles = await Role.find();
  res.json(roles);
};

export const getRoleById = async (req: Request, res: Response) => {
  const role = await Role.findById(req.params.id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  res.json(role);
};

export const createRole = async (req: Request, res: Response) => {
  const role = await Role.create(req.body);
  res.status(201).json(role);
};

export const updateRole = async (req: Request, res: Response) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!role) return res.status(404).json({ message: 'Role not found' });
  res.json(role);
};

export const deleteRole = async (req: Request, res: Response) => {
  const role = await Role.findByIdAndDelete(req.params.id);
  if (!role) return res.status(404).json({ message: 'Role not found' });
  res.status(204).send();
};
