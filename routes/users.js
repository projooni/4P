var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('user router');
  // res.send('respond with a resource');
  res.render('index', { title: 'Express' });
});

module.exports = router;
