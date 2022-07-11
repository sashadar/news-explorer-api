const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
/* app.use(requestLogger); */
app.use(limiter);

/* app.use(errorLogger); */
app.use(errors());
/* app.use(errorHandler); */
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
