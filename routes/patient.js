const express = require('express');
const router = express.Router();

const PatientController = require('../controllers/patient');

const authenticationMiddleware = require('../config/passport').authenticationMiddleware;
const isAdminMiddleware = require('../controllers/auth').isAdminMiddleware;

router.get('/createPatient', authenticationMiddleware, function (req, res, next) {
    res.render('createPatient');
  });
  
  router.post('/createPatient', authenticationMiddleware, function (req, res, next) {
    PatientController.createPatient(req, res);
  });
  
  router.get('/patients', authenticationMiddleware, function (req, res, next) {
    PatientController.getPatients(req, res);
  });
  
  router.get('/editPatient/:id', authenticationMiddleware, function (req, res, next) {
    PatientController.findPatient(req, res);
  });
  
  router.post('/editPatient/:id', authenticationMiddleware, function (req, res, next) {
    PatientController.updatePatient(req, res);
  });
  
  router.get('/deletePatient/:id', authenticationMiddleware, function (req, res) {
    PatientController.deletePatient(req, res);  
  });

  module.exports = router;