const Sequalize = require('sequelize');
const db = require('../loaders/db');

const Availability = db.define('availability', {
  start: {
    type: Sequalize.DATE
  },
  end: {
    type: Sequalize.DATE
  },
}, {
    underscored: true
});

module.exports = Availability;