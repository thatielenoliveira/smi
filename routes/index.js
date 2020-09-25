const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient');

const authenticationMiddleware = require('../config/passport').authenticationMiddleware;
const isAdminMiddleware = require('../controllers/auth').isAdminMiddleware;

// Testing admin middleware only, should be used to verify if user can access admin page 
router.get('/home', authenticationMiddleware, isAdminMiddleware, function (req, res, next) {
  res.send('index');
});

router.get('/createPatient', function (req, res, next) {
  res.render('createPatient');
});

router.post('/createPatient', function (req, res, next) {
  PatientController.createPatient(req, res);
});

router.get('/editPatient/:id', function (req, res, next) {
  PatientController.getPatients(req, res);
});

router.post('/editPatient/:id', function (req, res, next) {
  PatientController.updatePatient(req, res);
});

router.get('/',function (req, res) {
  res.redirect('/home');
});

module.exports = router;
