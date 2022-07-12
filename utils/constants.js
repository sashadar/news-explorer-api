const ERROR_MESSAGES = {
  articleInputValidationError: 'Input validation failed: unable to add article',
  articleNotFound: 'Article not found',
  articleOwnedByAnotherUser: 'Unable to delete articles owned by another user',
  userNotFound: 'User not found',
  userInputValidationError: 'Input validation failed: unable to create user',
  userEmailExists: 'User with the same email address already exists',
  userIncorrectCredentials: 'Incorrect password or email',
  userUnauthorized: 'Authorization required',
  serverError: 'An error occurred on the server',
};

const ERROR_NAMES = {
  validationError: 'ValidationError',
  castError: 'CastError',
  duplicateKey: 'duplicate key',
};

const STATUS_CODES = {
  ok: 200,
  created: 201,
  internalServerError: 500,
};

module.exports = {
  ERROR_MESSAGES,
  ERROR_NAMES,
  STATUS_CODES,
};
