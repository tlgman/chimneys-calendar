const Sequelize = require('sequelize');
const db = require('../loaders/db');

const Appointment = db.define('appointment', {
  datetime: {
    type: Sequelize.DATE
  },
  duration: {
    type: Sequelize.STRING
  },
  etat: {
    type: Sequelize.ENUM,
    values: ['taken', 'in_progress', 'done', 'canceled'],
    defaultValue: 'taken'
  },
  description: {
    type: Sequelize.TEXT
  },
  idClient: {
    type: Sequelize.INTEGER
  },
  idAddress: {
    type: Sequelize.INTEGER
  },
  idTypeIntervention: {
    type: Sequelize.INTEGER
  }
}, {
  underscored: true
});

module.exports = Appointment;
