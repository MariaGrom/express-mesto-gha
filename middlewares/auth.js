import { constants } from 'http2';
import jwt from 'jsonwebtoken';

// export const auth = (req, res, next) => {
//   const { authorization } = req.headers; // Достаем авторизационный заголовок
//   console.log('заголовок запроса -> ', req.headers)
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     console.log('что приходит в ИФ ->', authorization)
//     return res
//       .status(constants.HTTP_STATUS_UNAUTHORIZED)
//       .send({ message: 'Необходима авторизация. ОШИБКА ТУТ' });
//   }
//   const token = authorization.replace('Bearer ', ''); // Извлечем токен
//   let payload;

//   try {
//     payload = jwt.verify(token, 'some-secret-key'); // Верифицируем токен
//   } catch (err) {
//     return res
//       .status(constants.HTTP_STATUS_UNAUTHORIZED)
//       .send({ message: 'Необходима авторизация' });
//   }
//   req.user = payload; // Записываем пейлоад в объект запроса
//   next();
// }

export const auth = (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization) {
    res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    try {
      const decoded = jwt.verify(token, 'some-secret-key');
      req.user = { _id: decoded._id };
      next();
    } catch (err) {
      res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .send({ message: 'Необходима авторизация' });
    }
  }
};
