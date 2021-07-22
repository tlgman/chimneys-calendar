const Router = require('express').Router;
const Availability = require('../models/Availability');
const logger = require('../loaders/logger')(module);
const HttpStatus = require('http-status-codes');
const { query, validationResult } = require('express-validator');
const AvailabilitiesService = require('../services/availabilities.service');
const { addMinutes, parse, endOfDay, startOfDay } = require('date-fns');
const { convertToLocalTime } = require('date-fns-timezone');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    // TODO get from date limit
    const availabilities = await Availability.findAll();
    res.send(availabilities);
  } catch (err) {
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
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      status: 'error',
      message: 'CANNOT_UPDTATE_OR_CREATE_WEEK',
      err
    })
  }
});


/**
 * Get all available slots for specific coordinate
 */
router.get('/slots',
  query('lon').isNumeric(),
  query('lat').isNumeric(),
  query('start').isDate({ format: 'DD/MM/YYYY' }),
  query('end').isDate({ format: 'DD/MM/YYYY' }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST).send({ errors: errors.array() })
      return;
    }
    try {
      const currentDate = new Date;
      const lat = +req.query.lat;
      const lon = +req.query.lon;
      const start = convertToLocalTime(
        startOfDay(
          parse(req.query.start, 'dd/MM/yyyy', currentDate),
        ),
        { timeZone: 'Etc/GMT' }
      );
      const end = convertToLocalTime(
        endOfDay(
          parse(req.query.end, 'dd/MM/yyyy', currentDate)
        ),
        { timeZone: 'Etc/GMT' }
      );

      const availabilitiesService = new AvailabilitiesService();
      const result = await availabilitiesService.getAvailableSlots(lon, lat, start, end);
      res.send(result);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        errors: ['Unable to get appointments with these coordinates.']
      });
      logger.error('Unable to get appointments for coordinates %o : %o', [req.params.lat, req.params.lon], err);
    }
  }
);


module.exports = router;
