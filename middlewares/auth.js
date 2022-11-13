import { constants } from 'http2';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const { authorization } = req.headers; // Достаем авторизационный заголовок
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
      // console.log(err)
  }
  const token = authorization.replace('Bearer ', ''); // Извлечем токен
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key'); // Верифицируем токен
  } catch (err) {
    return res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // Записываем пейлоад в объект запроса
  next();
}