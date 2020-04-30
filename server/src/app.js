const express = require('express');
const config = require('config');

const morganLogger = require('./loaders/morganLogger');
const logger = require('./loaders/logger')(module);
const db = require('./loaders/db');
require('./loaders/initAssociationsModels');

const userRoutes = require('./api/users');
const interventionTypesRoutes = require('./api/interventionsTypes');
const appointmentsRoutes = require('./api/appointments');

const app = express();

// Init database and test connection
db.authenticate()
  .then(() => logger.info('Database connected'))
  .catch(err => logger.error('CRITIC - Unable to connect database : %s', err));

app.use(express.json());
app.use(morganLogger);

app.use('/users', userRoutes);
app.use('/intervention-types', interventionTypesRoutes);
app.use('/appointments', appointmentsRoutes);

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
