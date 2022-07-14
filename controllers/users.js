const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  ERROR_MESSAGES,
  ERROR_NAMES,
  STATUS_CODES,
  JWT_SECRET_DEV,
} = require('../utils/constants');
const InputValidationError = require('../errors/inputvalidationerror');
const NotFoundError = require('../errors/notfounderror');
const DuplicateKeyError = require('../errors/duplicatekeyerror');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_CODES.ok).send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId ? req.params.userId : req.user._id)
    .orFail(() => {
      throw new NotFoundError(ERROR_MESSAGES.userNotFound);
    })
    .then((user) => res.status(STATUS_CODES.ok).send({ data: user }))
    .catch((err) => {
      if (err.name === ERROR_NAMES.castError) {
        throw new NotFoundError(ERROR_MESSAGES.userNotFound);
      } else {
        throw err;
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) =>
      res
        .status(STATUS_CODES.created)
        .send({ _id: user._id, email: user.email })
    )
    .catch((err) => {
      if (err.name === ERROR_NAMES.validationError) {
        throw new InputValidationError(ERROR_MESSAGES.userInputValidationError);
      } else if (err.message.includes(ERROR_NAMES.duplicateKey)) {
        throw new DuplicateKeyError(ERROR_MESSAGES.userEmailExists);
      } else {
        throw err;
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        {
          expiresIn: '7d',
        }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
};
