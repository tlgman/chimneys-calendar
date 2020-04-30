const yargs = require('yargs');
const Sequelize = require('sequelize');
const db = require('../loaders/db');
require('../loaders/initAssociationsModels');
const InterventionType = require('../models/InterventionType');
const User = require('../models/User');
const Appointment = require('../models/Appointment');


const argv = yargs
  .command('init-db [--force]', 'Init database')
  .option('force', {
    describe: 'Add "DROP TABLE IF EXISTS" for each table creation',
    alias: 'f',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .argv;

db.sync({force: !!argv.force})
  .then(() => {
    console.log('Database initilized.');
    db.close();
  }).catch(err => {
    console.error('Error during db initialization : ', err);
    db.close();
    process.exit(-1);
  });


