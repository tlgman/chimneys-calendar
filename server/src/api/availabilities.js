const Router = require('express').Router;
const Availability = require('../models/Availabilitiy');
const logger = require('../loaders/logger')(module);
const HttpStatus = require('http-status-codes');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    // TODO get from date limit
    const availabilities = await Availability.findAll();
    res.send(availabilities);
  } catch(err) {
    logger.error('Unable get availabilities: %o', err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Unable to get availabilities.');
  }
});

// Create and update many availabilities at same time
router.post('/week', async (req, res) => {
  const availabilities = req.body.availabilities;
  console.log(availabilities);
  // TODO - Deleted the remove availabilities
  // Check all availabilities to update and add it on option
  try {
    await Availability.bulkCreate(availabilities);
    res.send({
      status: 'updated',
      message: 'WEEK_UPDATED'
    });
  } catch(err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
     status: 'error',
     message: 'CANNOT_UPDTATE_OR_CREATE_WEEK',
     err 
    })
  }

});

module.exports = router;