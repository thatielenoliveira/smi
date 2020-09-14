var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false
});

var PatientModel = require('../models/patient/patient')(sequelize, Sequelize);



/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('login');
  res.send('index');
});

router.get('/createPatient', function(req, res, next) {
  //res.render('login');
  res.render('createPatient');
});

router.post('/createPatient', function(req, res, next) {


  sequelize.sync({ force: true }).then(() => {
    PatientModel.create({
      fullName: req.body.fullName,
      mothersName: req.body.mothersName,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      postalCode: req.body.postalCode,
      streetName: req.body.streetName,
      houseNumber: req.body.houseNumber,
      complement: req.body.complement,
      district: req.body.district,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      liveWith: req.body.liveWith,
      emergencyPhone: req.body.emergencyPhone
    }).then((user) => {
        console.log('Patient Successfully Created');
        res.redirect('/');
    }, (error) => {
        console.error(error);
        res.redirect('/createPatient');
    });
});
});


module.exports = router;
