const Router = require('express').Router;
const HttpStatus = require('http-status-codes');
const logger = require('../loaders/logger')(module);
const Appointment = require('../models/Appointment');

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.send(appointments);
  } catch(ex) {
    logger.error('Unable to get appointments %j', ex);
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unable to get appointments'});
  }
});


router.post('/', async(req, res) => {
  try {
    const appointment = await Appointment.create({
      datetime: Date.now(),
      duration: '2h10',
      etat: 'taken',
      description: req.body.description,
      idTypeIntervention: 1
    });
    res.status(HttpStatus.CREATED).send(appointment);
  } catch(ex) {
    logger.error('Unable to create appointments %j', ex);
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unable to create appointments'});
  }
});

module.exports = router;
