const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');

const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { ERROR_MESSAGES, DB_ADDRESS } = require('./utils/constants');

const NotFoundError = require('./errors/notfounderror');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.use(limiter);

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);

app.use('/users', auth, usersRouter);
app.use('/articles', auth, articlesRouter);

app.use('/', (req, res) => {
  throw new NotFoundError(ERROR_MESSAGES.resourceNotFound);
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
