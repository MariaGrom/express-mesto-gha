import { constants } from 'http2';
import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Создаем контроллер POST-запроса для создания нового пользователя с хешированием пароля
export const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcryptjs.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name, //необязательное поле - можно удалить?
      about: req.body.about, //необязательное поле - можно удалить?
      avatar: req.body.avatar, //необязательное поле - можно удалить?
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

// Создаем контроллер логирования пользователя
export const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
 const token = jwt.sign({_id: user._id}, 'some-secret-key', { expiresIn: '7d'})
 res.send({token})
     })
    .catch((err) => {
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).send({ message: err.message })
    })
}

// Создаем контроллер GET-запроса всех пользователей
export const findUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
    });
};

// Создаем контроллер GET-запроса по id пользователя
export const findUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные поиска' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

// Создаем контроллер PATCH-запроса по обновлению профиля
export const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные при обновлении профиля' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

// Создаем контроллер PATCH-запроса по обновлению аватара профиля
export const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные при обновлении аватара' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      }
    });
};
