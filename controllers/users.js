import { user } from '../models/user.js';
import { constants } from 'http2';


// Создаем контроллер POST-запроса для создания нового пользователя
export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' })
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' })
      }
    })
}

// Создаем контроллер GET-запроса всех пользователей
export const findUsers = (req, res) => {
  user.find({})
    .then(users => res.send({ data: users }))
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' })
    })
}

// Создаем контроллер GET-запроса по id пользователя
export const findUserById = (req, res) => {
  user.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user })
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' })
      }
    })
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' })
    })
};

// Создаем контроллер PATCH-запроса по обновлению профиля
export const updateUserProfile = (req, res) => {
  const { name, about } = req.body
  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user)
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' })
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные при обновлении профиля' })
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' })
      }
    })
}

// Создаем контроллер PATCH-запроса по обновлению аватара профиля
export const updateUserAvatar = (req, res) => {
  const { avatar } = req.body
  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user)
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' })
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные при обновлении аватара' })
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' })
      }
    })
}