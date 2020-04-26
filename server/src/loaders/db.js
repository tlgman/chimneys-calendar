const Sequelize = require('sequelize');
const config = require('config');
const logger = require('./logger')(module);



const db = new Sequelize(config.get('db.dbname'), config.get('db.username'), config.get('db.password'), {
  host: config.get('db.hostname'),
  dialect: 'postgres',
  logging: logger.level === 'debug' || logger.level === 'database' ?  message => logger.database(message) : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
