const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../validators/validators');

const {
  getArticles,
  createArticle,
  deleteArticleById,
} = require('../controllers/articles');

router.get('/', getArticles);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required,
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    }),
  }),
  createArticle
);

router.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteArticleById
);

module.exports = router;
