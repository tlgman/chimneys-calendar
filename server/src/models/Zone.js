const Sequelize = require('sequelize');
const db = require('../loaders/db');

const Zone = db.define('zone', {
  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING(10)
  },
  geom: {
    type: Sequelize.GEOMETRY('POLYGON')
  }
}, {
  timestamps: false,
  underscored: true
});

module.exports = Zone;
