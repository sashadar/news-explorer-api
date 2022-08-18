const Article = require('../models/article');
const {
  ERROR_MESSAGES,
  ERROR_NAMES,
  STATUS_CODES,
} = require('../utils/constants');
const InputValidationError = require('../errors/inputvalidationerror');
const NotFoundError = require('../errors/notfounderror');
const ForbiddenError = require('../errors/forbiddenerror');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(STATUS_CODES.ok).send({ data: articles }))
    .catch(next);
};

const addArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(STATUS_CODES.created).send({ data: article }))
    .catch((err) => {
      if (err.name === ERROR_NAMES.validationError) {
        throw new InputValidationError(
          ERROR_MESSAGES.articleInputValidationError
        );
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(ERROR_MESSAGES.articleNotFound);
      } else if (article.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(ERROR_MESSAGES.articleOwnedByAnotherUser);
      } else {
        return Article.deleteOne({ _id: req.params.articleId });
      }
    })
    .then((response) => res.status(STATUS_CODES.ok).send({ data: response }))
    .catch((err) => {
      if (err.name === ERROR_NAMES.castError) {
        throw new NotFoundError(ERROR_MESSAGES.articleNotFound);
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports = { getArticles, addArticle, deleteArticle };
