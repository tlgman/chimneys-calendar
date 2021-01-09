const express = require('express');
const config = require('config');
const cors = require('cors');

const morganLogger = require('./loaders/morganLogger');
const logger = require('./loaders/logger')(module);
const db = require('./loaders/db');
require('./loaders/initAssociationsModels');

const userRoutes = require('./api/users');
const interventionTypesRoutes = require('./api/interventionsTypes');
const appointmentsRoutes = require('./api/appointments');
const zonesRoutes = require('./api/zones');

const app = express();

// Init database and test connection
db.authenticate()
  .then(() => logger.info('Database connected'))
  .catch(err => logger.error('CRITIC - Unable to connect database : %s', err));

if(config.get('env') === 'development') {
  // Access-Control-Allow-Origin "*" for development mode
  app.use(cors());
}

app.use(express.json());
// For logging requests
app.use(morganLogger);

// Init routes
app.use('/users', userRoutes);
app.use('/intervention-types', interventionTypesRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/zones', zonesRoutes);

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
