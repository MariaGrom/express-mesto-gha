import { createCard, findCards, deleteCard } from '../controllers/cards.js';
import { Router } from 'express';

export const cardRoutes = Router();

cardRoutes.post('/cards', createCard);
cardRoutes.get('/cards', findCards);
cardRoutes.delete('/cards/:id', deleteCard)

