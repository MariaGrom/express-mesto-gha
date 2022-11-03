import { user } from '../models/user.js'

// Создаем контроллер POST-запроса для создания нового пользователя
export const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar }) // создаем "create" из тела запроса константу с name, about, avatar
    .then(user => res.send(user)) // если результат положительный, то отдаем пользователя
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' }) // если приходит ошибка, то пишем текст ошибки
    })
}

// Создаем контроллер GET-запроса всех пользователей
export const findUsers = (req, res) => {
  user.find({})
    .then(users => res.send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка выгрузки с сервера' })
    })
}

// Создаем контроллер GET-запроса по Id пользователя
export const findUserById = (req, res) => {
  user.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка поиска Юзера по id' })
    });
}

// Создаем контроллер PATCH-запроса по обновлению профиля
export const updateUserProfile = (req, res) => {
  const { name, about } = req.body
  user.findByIdAndUpdate(req.user._id, { name, about })
  .then (user => res.send (user))
  .catch(() => {
    res.status(500).send({ message: 'Произошла ошибка обновления данных пользователя на сервере' })
  })
}

// Создаем контроллер PATCH-запроса по обновлению аватара профиля
export const updateUserAvatar = (req, res) => {
  const {avatar} = req.body
  user.findByIdAndUpdate(req.user._id, {avatar})
  .then(user => res.send(user))
  .catch(() => {
    res.status(500).send({ message: 'Произошла ошибка обновления аватара пользователя на сервере' })
  })
}