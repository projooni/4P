var express = require('express');
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);

console.log('router index');

/* GET home page. */
router.get('/get-component', function(req, res, next) {
  // console.log('router!');
  // console.log(pgp);
  var db = pgp("postgres://postgres:1234@localhost:5432/postgres");

  db.query("SELECT * from component")
    .then(function (data) {
      console.log("DATA:", data);
      res.send(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });

  // res.render('index', { title: 'Express' });

});

module.exports = router;
