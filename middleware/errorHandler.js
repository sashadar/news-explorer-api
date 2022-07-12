const { ERROR_MESSAGES, STATUS_CODES } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = STATUS_CODES.internalServerError, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === STATUS_CODES.internalServerError
        ? ERROR_MESSAGES.serverError
        : message,
  });
};
