const Router = require('express').Router;
const logger = require('../loaders/logger')(module);
const InterventionType = require('../models/InterventionType');


const router = Router();

router.get('/', (req, res) => {
  res.send('hello')
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const interventionType = {
    title: req.body.title,
    description: 'Ceci est un test',
    price: 55,
    duration: '2h50m'
  };

  try{
    await InterventionType.create(interventionType);
    res.send(interventionType);
  } catch(ex) {
    logger.error('Unable to create %s', ex);
    res.sendStatus(500).send({error: ex});
    return;
  }


});

module.exports = router;
