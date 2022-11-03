import { createCard, findCards, deleteCard, likeCard, dislikeCard } from '../controllers/cards.js';
import { Router } from 'express';

export const cardRoutes = Router();

cardRoutes.post('/cards', createCard);
cardRoutes.get('/cards', findCards);
cardRoutes.delete('/cards/:id', deleteCard);
cardRoutes.put('/cards/:cardId/likes', likeCard);
cardRoutes.delete('/cards/:cardId/likes', dislikeCard)
