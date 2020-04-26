const express = require('express');
const User = require('../models/User');
const logger = require('../loaders/logger')(module);

const router = express.Router();

router.get('/', (req, res) => {
  User.findAll({attributes: ['id', 'login', 'role']}).then(users => {
    logger.debug('users: %j', users);
    res.send(users);
  }).catch((err) => {
    logger.error('Cannot acces to users : %s', err);
  });
});


module.exports = router;
