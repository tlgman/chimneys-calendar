const Router = require('express').Router;
const HttpStatus = require('http-status-codes');
const logger = require('../loaders/logger')(module);
const Appointment = require('../models/Appointment');
const Sequelize = require('sequelize');
const db = require('../loaders/db');



const router = new Router();

router.get('/', async (req, res) => {
  try {
    const appointments = (await Appointment.findAll({include: ['interventionType']}))
      .map(appointment => {
        if(appointment.interventionType) {
          // No display price and description
          appointment.interventionType.price = void(0);
          appointment.interventionType.description = void(0);
        }
        return appointment;
      });
    // const interventions = await appointments.getInterventionsType();
    res.send(appointments);
  } catch(ex) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unable to get appointments'});
    logger.error('Unable to get appointments %o', ex);
  }
});


router.post('/', async(req, res) => {
  try {
    const appointment = await Appointment.create({
      datetime: Date.now(),
      duration: '2h10',
      etat: 'taken',
      description: req.body.description,
      interventionTypeId: 1
    });
    res.status(HttpStatus.CREATED).send(appointment);
  } catch(ex) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unable to create appointments'});
    logger.error('Unable to create appointments %o', ex);
  }
});


module.exports = router;
