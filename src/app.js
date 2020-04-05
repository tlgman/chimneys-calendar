const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./api/userRoutes');
const morganLogger = require('./loaders/morganLogger');
const logger = require('./loaders/logger');

const app = express();
const PORT = 3000;


app.use(morganLogger);

app.use(bodyParser.json());

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  console.log('request');
  res.send('We are on home!');
});

// Middlewares
app.use('/posts', () => {
  console.log('posts middleware');
});

app.listen(PORT);
