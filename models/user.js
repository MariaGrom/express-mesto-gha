import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

// Создаем схему Пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
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
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль')); // введенная почта не найдена - отклоняем промис
      }

      return bcrypt.compare(password, user.password) // введенная почта найдена - сравниваем переданный пароль и хэш из базы
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль')); // хэши не совпали - отклоняем промис
          }
          return user
        })
    })
}

// Создаем модель Пользователя
export const User = mongoose.model('user', userSchema);
