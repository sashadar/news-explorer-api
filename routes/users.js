const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUsers, getUserById } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserById);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUserById
);

module.exports = router;
