class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = 'DuplicateKeyError';
  }
}

module.exports = DuplicateKeyError;
