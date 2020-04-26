const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');


const morganLogger = require('./loaders/morganLogger');
const logger = require('./loaders/logger')(module);
const db = require('./loaders/db');

const userRoutes = require('./api/users');


const app = express();

// Init database and test connection
db.authenticate()
  .then(() => logger.info('Database connected'))
  .catch(err => logger.error('CRITIC - Unable to connect database : %s', err));

app.use(express.json());
app.use(morganLogger);

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('We are on home!');
});

// Middlewares
app.use('/posts', () => {
  console.log('posts middleware');
});

app.listen(config.get('server.port'), () => {
  logger.info('Server is running on port %d', config.get('server.port'));
});
