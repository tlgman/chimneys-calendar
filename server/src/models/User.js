const Sequelize = require('sequelize');
const db = require('../loaders/db');

const User = db.define('user', {
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  underscored: true
});

module.exports = User;
