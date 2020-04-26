const Router = require('express').Router;

const router = Router();

router.get('/', (req, res) => {
  res.send('hello')
});

router.post('/', (req, res) => {
  console.log(req.body);
  const interventionType = {
    duration: '2h50m'
  };
  res.send(req.body.name);
});

module.exports = router;
