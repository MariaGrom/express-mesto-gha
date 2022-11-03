import { constants } from 'http2';
import { card } from '../models/cards.js';

// Создаем контроллер POST-запроса для создания новой карточки
export const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

// Создаем контроллер GET-запроса для выгрузки всех карточек
export const findCards = (req, res) => {
  card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка выгрузки карточек с сервера' });
    });
};

// Создаем контроллер DELETE-запроса на удаление карточки по id
export const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка удаление карточки с сервера' });
    });
};

// Создаем контроллер PUT-запроса постановки лайка
export const likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка постановки лайка на карточку на сервере' });
    });
};

// Создаем контроллер DELETE-запроса удаления лайка
export const dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка удаления лайка с карточки на сервере' });
    });
};
