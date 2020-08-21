var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});

module.exports = router;
