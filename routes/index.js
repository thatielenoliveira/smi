const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient');

router.get('/', function (req, res, next) {
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

module.exports = router;
