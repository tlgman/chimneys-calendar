const sequelize = require('sequelize');
const db = require('../loaders/db');

const InterventionType = db.define('intervention_type', {
  title: {
    type: sequelize.STRING
  },
  description: {
    type: sequelize.STRING
  },
  price: {
    type: sequelize.NUMBER
  },
  duration: {
    type: sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = InterventionType;
