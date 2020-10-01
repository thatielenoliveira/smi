const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index');

const authenticationMiddleware = require('../config/passport').authenticationMiddleware;
const isAdminMiddleware = require('../controllers/auth').isAdminMiddleware;

// Testing admin middleware only, should be used to verify if user can access admin page 
router.get('/home', authenticationMiddleware, isAdminMiddleware, function (req, res, next) {
  IndexController.getInformationHome(req, res);
});

router.get('/',function (req, res) {
  res.redirect('/home');
});

module.exports = router;
