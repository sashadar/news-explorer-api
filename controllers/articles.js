const Article = require('../models/article');
const InputValidationError = require('../errors/inputvalidationerror');
const NotFoundError = require('../errors/notfounderror');
const ForbiddenError = require('../errors/forbiddenerror');

const getArticles = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
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
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InputValidationError(
          'Input validation failed: unable to add a new article'
        );
      }
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('An article to be deleted not found');
      } else if (article.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(
          'Unable to delete articles owned by another user'
        );
      } else {
        return Article.deleteOne({ _id: req.params.articleId });
      }
    })
    .then((article) => res.status(200).send({ data: article }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('A card to be deleted not found');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports = { getArticles, addArticle, deleteArticle };
