import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';

// Создаем схему Пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  }
}, {versionKey: false});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
  .select('+password')
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error('Неправильные почта или пароль')); // введенная почта не найдена - отклоняем промис
      }
      return bcrypt.compare(password, document.password) // введенная почта найдена - сравниваем переданный пароль и хэш из базы
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль')); // хэши не совпали - отклоняем промис
          }
          const user = document.toObject();
          delete user.password;
          return user;
        })
    })
}

// Создаем модель Пользователя
export const User = mongoose.model('user', userSchema);
