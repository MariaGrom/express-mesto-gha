import { createUser, findUsers, findUserById } from '../controllers/users.js';
import { Router } from 'express';

export const userRoutes = Router();

userRoutes.post('/users', createUser);
userRoutes.get('/users', findUsers);
userRoutes.get('/users/:id', findUserById)
