const express = require('express');
const logger = require('../loaders/logger')

const router = express.Router();

router.get('/', (req, res) => {
  res.send('User route');
  console.log('Hello');
});


module.exports = router;
