const Router = require('express').Router;
const HttpStatus = require('http-status-codes');
const logger = require('../loaders/logger')(module);
const InterventionType = require('../models/InterventionType');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const interventionsTypes = await InterventionType.findAll();
    res.send(interventionsTypes);
  } catch(ex) {
    logger.error('Unable to get intervention type: %j', ex);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unable to get intervention type'});
  }
});

router.post('/', async (req, res) => {
  try{
    const interventionType = await InterventionType.create({
      title: req.body.title,
      description: 'Ceci est un test',
      price: 55,
      duration: '2h50m'
    });
    res.status(HttpStatus.CREATED).send(interventionType);
  } catch(ex) {
    logger.error('Unable to create intervention type: %j', ex);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: 'Unable to create intervention type'});
  }
});

module.exports = router;
