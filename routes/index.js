const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../config/passport').authenticationMiddleware;
const isAdminMiddleware = require('../controllers/auth').isAdminMiddleware;

// Testing admin middleware only, should be used to verify if user can access admin page 
router.get('/home', authenticationMiddleware, isAdminMiddleware, function (req, res, next) {
  res.send('index');
});

router.get('/',function (req, res) {
  res.redirect('/home');
});

module.exports = router;
