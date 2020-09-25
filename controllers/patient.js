const PatientModel = require('../config/database').PatientModel;

module.exports.createPatient = function (req, res) {
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
}

module.exports.getPatients = function (req, res) {
    PatientModel.findAll({ limit: 1, where: { id: req.params.id } }).then(function (entries) {
        if (entries) {
            res.render('editPatient', { data: entries });
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}

module.exports.updatePatients = function (res, res) {
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
    }, { where: { id: req.params.id } }).then((result) => {
        console.log(result);
        console.log('Patient Successfully Updated');
        res.redirect('/');
    }, (error) => {
        console.error(error);
    });
}

