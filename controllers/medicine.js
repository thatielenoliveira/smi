const MedicineModel = require('../config/database').MedicineModel;
const PatientModel = require('../config/database').PatientModel;

module.exports.createMedicine = function (req, res) {

    var hours = [];
    var t = parseInt(req.body.startTime.slice(0, 2));

    switch(req.body.schedule){
        case "24h":
            hours = [parseInt(req.body.startTime.slice(0, 2))];

        case '12h/12h':
            
            hours = [t, ((t + 12) % 24) ];
        
        case '8h/8h':
            hours = [t, ((t + 8) % 24), ((t + 16) % 24) ];

        case '6h/6h':
            hours = [t, ((t + 6) % 24), ((t + 12) % 24), ((t + 18) % 24)  ];

        case '4h/4h':
            hours = [t, ((t + 4) % 24), ((t + 8) % 24), ((t + 12) % 24), ((t + 16) % 24), ((t + 20) % 24) ];
    }

    MedicineModel.create({
            name: req.body.name,
            amount: req.body.amount,
            days: req.body.days,
            schedule: JSON.stringify(hours)
    }).then((result) => {
        result.patientId = req.body.patientId;
    
        result.save().then(() => {
            console.log('Medicine Successfully Created');
            res.redirect('/medicines');
        }).catch((error) => {
            console.error(error);
        })
    }, (error) => {
        console.error(error);
        res.redirect('/insertMedicine');
    });
}

module.exports.getPatients = function (req, res) {
    PatientModel.findAll().then(function (entries) {
        if (entries) {
            res.render('insertMedicine', {data: entries });
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}

module.exports.findMedicine = function (req, res) {
    MedicineModel.findAll({ limit: 1, where: { id: req.params.id } }).then(async function (entries) {
        if (entries) {

            const patients = await PatientModel.findAll()
            .catch((err) => {
                console.error(err);
            });

            res.render('editMedicine', { medicines: entries , data: patients});
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}

module.exports.getMedicines = function (req, res) {
    MedicineModel.findAll({include: [{ model: PatientModel }], raw: true, nest: true}).then(function (entries) {
        if (entries) {
            res.render('listMedicines', {data: entries });
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}


module.exports.updateMedicine = function (req, res) {

    var hours = [];
    var t = parseInt(req.body.startTime.slice(0, 2));

    switch(req.body.schedule){
        case "24h":
            hours = [parseInt(req.body.startTime.slice(0, 2))];

        case '12h/12h':
            
            hours = [t, ((t + 12) % 24) ];
        
        case '8h/8h':
            hours = [t, ((t + 8) % 24), ((t + 16) % 24) ];

        case '6h/6h':
            hours = [t, ((t + 6) % 24), ((t + 12) % 24), ((t + 18) % 24)  ];

        case '4h/4h':
            hours = [t, ((t + 4) % 24), ((t + 8) % 24), ((t + 12) % 24), ((t + 16) % 24), ((t + 20) % 24) ];
    }

    MedicineModel.update({
        name: req.body.name,
        amount: req.body.amount,
        days: req.body.days,
        schedule: JSON.stringify(hours),
        patientId: req.body.patientId
    }, { where: { id: req.params.id } }).then((result) => {
        console.log('Medicine Successfully Updated');
        res.redirect('/medicines');
    }, (error) => {
        console.error(error);
    });
}

module.exports.deleteMedicine = function (req, res) {
    MedicineModel.destroy({
        where: {
          id: req.params.id
        }
    }).then((user) => {
        console.log('Medicine Successfully Deleted');
        res.redirect('/medicines');
    }, (error) => {
        console.error(error);
    });
}

