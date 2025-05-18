// backend-boilerplate/src/scripts/seedRoles.ts
import mongoose from 'mongoose';
import { config } from '../config/env';
import Role from '../api/auth/role.model';

const seedRoles = async () => {
  await mongoose.connect(config.MONGO_URI);

  const roles = [
    { name: 'admin', permissions: ['*'] },
    { name: 'user', permissions: [] },
    { name: 'editor', permissions: ['edit:content'] },
  ];

  for (const role of roles) {
    const exists = await Role.findOne({ name: role.name });
    if (!exists) await Role.create(role);
  }

  console.log('✅ Roles seeded');
  mongoose.disconnect();
};

seedRoles();
