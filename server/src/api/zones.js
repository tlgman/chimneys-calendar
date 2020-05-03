const Router = require('express').Router;
const HttpStatus = require('http-status-codes');
const logger = require('../loaders/logger')(module);
const Zone = require('../models/Zone');


const router = new Router();

router.post('/', async (req, res) => {
  try {
    const zone = await Zone.create({
      name: req.body.name || null,
      color: req.body.color,
      geom: req.body.features.features[0].geometry
    });
    res.status(HttpStatus.CREATED).send(zone);
  } catch(err) {
    logger.error('Error during zone creation: %o', err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Unable to create new zone.');
  }
});


module.exports = router;
