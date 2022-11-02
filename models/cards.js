import mongoose from "mongoose";

// Создаем схему Карточки
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'}
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


//Создаем модель Карточки
export const Card = mongoose.model('card', cardSchema);