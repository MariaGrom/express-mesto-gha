import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
  findCurrentUser
} from '../controllers/users.js';
import { userAvatarValidator } from '../validators/validators.js';
import { userProfileValidator } from '../validators/validators.js';
import { userIdValidator } from '../validators/validators.js';


export const userRoutes = Router();

userRoutes.get('/users/me', findCurrentUser);
userRoutes.get('/users', findUsers);
userRoutes.get('/users/:id', userIdValidator, findUserById);
userRoutes.patch('/users/me', userProfileValidator, updateUserProfile);
userRoutes.patch('/users/me/avatar', userAvatarValidator, updateUserAvatar);
