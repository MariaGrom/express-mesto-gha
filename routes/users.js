import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
  findCurrentUser
  //createUser
} from '../controllers/users.js';

export const userRoutes = Router();

//userRoutes.post('/users', createUser);
userRoutes.get('/users/me', findCurrentUser);
userRoutes.get('/users', findUsers);
userRoutes.get('/users/:id', findUserById);
userRoutes.patch('/users/me', updateUserProfile);
userRoutes.patch('/users/me/avatar', updateUserAvatar);
