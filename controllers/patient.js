const FallModel = require('../config/database').FallModel;
const PatientModel = require('../config/database').PatientModel;
const MedicineModel = require('../config/database').MedicineModel;

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

module.exports.findPatient = function (req, res) {
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

module.exports.getPatients = function (req, res) {
    PatientModel.findAll().then(function (entries) {
        if (entries) {

            const currentYear = new Date().getFullYear();
           
            res.render('listPatients', {data: entries,  currentYear: currentYear });
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}


module.exports.updatePatients = function (req, res) {
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
        console.log('Patient Successfully Updated');
        res.redirect('/patients');
    }, (error) => {
        console.error(error);
    });
}

module.exports.deletePatient = function (req, res) {
    PatientModel.destroy({
        where: {
          id: req.params.id
        }
    }).then((user) => {
        console.log('Patient Successfully Deleted');
        res.redirect('/patients');
    }, (error) => {
        console.error(error);
    });
}

module.exports.viewPatient = function (req, res) {
    PatientModel.findAll({ limit: 1, where: { id: req.params.id } }).then((user) => {
        const currentYear = new Date().getFullYear();
        FallModel.findAll({ where: { id: req.params.id } }).then((falls) => {
            MedicineModel.findAll({ where: { patientId: req.params.id }, raw: true, nest: true }).then((meds) => {
                for (let i = 0; i < meds.length; i++) {
                    const schedule = JSON.parse(meds[i].schedule);
                    let scheduleStr = schedule.length ?  schedule[0].toString() + ':00' : '';
                    for (let i = 1; i < schedule.length; i++) {
                        scheduleStr = scheduleStr +', ' + schedule[i] + ':00';
                    }
                    meds[i].schedule = scheduleStr;
                }
                res.render('viewPatient', { patient: user, currentYear: currentYear, falls: falls, medicines: meds });
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
            console.error(err);
        });
    }, (error) => {
        console.error(error);
    });
}

