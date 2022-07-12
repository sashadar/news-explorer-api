const ERROR_MESSAGES = {
  articleInputValidationError: 'Input validation failed: unable to add article',
  articleNotFound: 'Article not found',
  articleOwnedByAnotherUser: 'Unable to delete articles owned by another user',
};

const ERROR_NAMES = {
  validationError: 'ValidationError',
  castError: 'CastError',
};

const STATUS_CODES = {
  ok: 200,
  created: 201,
  accepted: 202,
};

module.exports = {
  ERROR_MESSAGES,
  ERROR_NAMES,
  STATUS_CODES,
};
