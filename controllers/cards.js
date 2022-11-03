import { card } from '../models/cards.js';

// Создаем контролер POST-запроса для создания новой карточки
export const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  card.create({ name, link, owner:req.user._id })
    .then(card => res.send(card))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка создания карточки' })
    })
}

// Создаем контролер GET-запроса для выгрузки всех карточек
export const findCards = (req, res) => {
  card.find({})
  .then(cards => res.send({data: cards}))
  .catch(() => {
    res.status(500).send({message: 'Произошла ошибка выгрузки карточек с сервера'})
  })
}

// Создаем контролер DELETE-запроса на удаление карточки по id
export const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.id)
  .then(card => res.send(card))
  .catch(() => {
    res.status(500).send({message: 'Произошла ошибка удаление карточки с сервера'})
  })
}

//