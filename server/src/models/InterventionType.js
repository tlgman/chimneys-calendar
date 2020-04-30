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
    type: sequelize.DECIMAL(2)
  },
  duration: {
    type: sequelize.STRING
  }
}, {
  timestamps: false,
  underscored: true
});

module.exports = InterventionType;
