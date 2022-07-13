const jwt = require('jsonwebtoken');
const { ERROR_MESSAGES, JWT_SECRET_DEV } = require('../utils/constants');
const LoginError = require('../errors/loginerror');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV
    );
  } catch (err) {
    throw new LoginError(ERROR_MESSAGES.userUnauthorized);
  }

  req.user = payload;
  next();
};
