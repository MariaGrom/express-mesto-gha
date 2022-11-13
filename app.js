import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import process from 'process';
import { constants } from 'http2';
import { userRoutes } from './routes/users.js';
import { cardRoutes } from './routes/cards.js';
import { createUser, login } from './controllers/users.js'

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// Создаем временный мидлвэр по авторизации пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '63616bd2b216ed79c905d96f',
  };
  next();
});

// Вызываем роутинг пользователя
app.use('/', userRoutes);

// Вызываем роутинг карточек
app.use('/', cardRoutes);

// Вызываем роутинг регистрации
app.post('/signin', login);

// Вызываем роутинг входа
app.post('/signup', createUser);

// Запрос главной страницы приложения
app.all('/*', (req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  console.log('Запускаем сервер')
});
