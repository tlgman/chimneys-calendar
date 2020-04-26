const Sequelize = require('sequelize');
const config = require('config');

const db = new Sequelize(config.get('db.dbname'), config.get('db.username'), config.get('db.password'), {
  host: config.get('db.hostname'),
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
