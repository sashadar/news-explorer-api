const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
/* const bcrypt = require('bcryptjs');
const LoginError = require('../errors/loginerror'); */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Not correct email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

/* userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new LoginError('Incorrect password or email');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new LoginError('Incorrect password or email'));
        }
        return user;
      });
    });
}; */

module.exports = mongoose.model('user', userSchema);
