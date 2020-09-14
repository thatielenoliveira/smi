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
  res.send('index');
});

router.get('/createPatient', function(req, res, next) {
  res.render('createPatient');
});

router.post('/createPatient', function(req, res, next) {

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
    }).then((result) => {
        console.log('Patient Successfully Created');
        res.redirect('/');
    }, (error) => {
        console.error(error);
        res.redirect('/createPatient');
    });

});

router.get('/editPatient/:id', function(req, res, next) {

  PatientModel.findAll({
    limit: 1,
    where: {
      id: req.params.id
    },
  }).then(function(entries){
    if (entries) {
      res.render('editPatient', { data: entries});
  } else {
      console.log("no data exist for this id");
  }
    
  }, (error) => {
    console.error(error);
}); 

});

router.post('/editPatient/:id', function(req, res, next) {

    PatientModel.update({
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
    },
    { where: { id: req.params.id } }
    ).then((result) => {
        console.log(result);
        console.log('Patient Successfully Updated');
        res.redirect('/');
    }, (error) => {
        console.error(error);
    });

});


module.exports = router;
