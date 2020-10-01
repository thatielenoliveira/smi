const PatientModel = require('../config/database').PatientModel;
const UserModel = require('../config/database').UserModel;

module.exports.getInformationHome = function (req, res) {
    PatientModel.findAndCountAll().then( async function (entries) {
        if (entries) {

            const users = await UserModel.findAndCountAll().catch((err) => {
                console.error(err);
            });

            const patients = await PatientModel.findAll({ order: [['createdAt', 'DESC']], limit: 5}).catch((err) => {
                console.error(err);
            });

            const currentYear = new Date().getFullYear();

            res.render('home', {patients: patients, users: users, patientsc: entries, currentYear: currentYear});
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}
