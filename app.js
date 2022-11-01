import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express ();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса


// Создаем схему Пользователя => убрать из app.js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  }
})

//Создаем модель Пользователя => убрать из app.js

const user = mongoose.model('user', userSchema);


// Создаем роутинг POST-запроса => убрать из app.js
app.post('/users', (req, res) => {
console.log('req.body =>', req.body) // убрать из кода, нужен только для проверки работы связи с сервером
  const { name, about, avatar } = req.body;
  user.create({name, about, avatar}) // создаем "create" из тела запроса константу с name, about, avatar
  .then (user => res.send (user)) // если результат положительный, то отдаем пользователя
  .catch (err => {
    res.status(500).send({ message: 'Произошла ошибка' }) // если приходит ошибка, то пишем текст ошибки
  })
})

// Создаем роутинг GET-запроса => убрать из app.js
// app.get('/users', (req, res) => {

// })


app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Запускаем сервер ${PORT}`)
})
