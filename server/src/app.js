const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');


const morganLogger = require('./loaders/morganLogger');
const db = require('./loaders/db');

const userRoutes = require('./api/userRoutes');
const logger = require('./loaders/logger');

const app = express();

// Init database and test connection
db.authenticate()
  .then(() => logger.info('Database connected'))
  .catch(err => logger.error('CRITIC - Unable to connect database : %s', err));

app.use(morganLogger);

// app.use(bodyParser.json());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  console.log('request');
  res.send('We are on home!');
});

// Middlewares
app.use('/posts', () => {
  console.log('posts middleware');
});

app.listen(config.get('server.port'), () => {
  logger.info('Server is running on port %d', config.get('server.port'));
});
