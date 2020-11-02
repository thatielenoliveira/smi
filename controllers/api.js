const UserModel = require('../config/database').UserModel;
const FallModel = require('../config/database').FallModel;
const HeartRateModel = require('../config/database').HeartRateModel;


// security
const UserController = require('../controllers/user');


module.exports.logout = function (req, res) {
    req.logOut();
    res.redirect('/login');
}

module.exports.isAdminMiddleware = function (req, res, next) {
    UserController.isAdmin(req, res, next);
}


// users
module.exports.getUsers = async function (req, res) {
    const users = await UserModel.findAll();
    res.send(users);
}



// falls
module.exports.getFalls = async function (req, res) {
    const falls = await FallModel.findAll();
    res.send(falls);
}

module.exports.createFall = function (req, res) {
    FallModel.create({
        datetime: req.body.datetime,
        rate: req.body.rate,
        userId: req.body.userId,
    }).then((result) => {
        console.log('Fall Successfully Created');
        res.redirect('/');
    }, (error) => {
        console.error(error);
        res.redirect('/createFall');
    });
}


// heart rate
module.exports.getHeartRates = async function (req, res) {
    const heartRates = await HeartRateModel.findAll();
    res.send(heartRates);
}

module.exports.createHeartRate = function (req, res) {
    HeartRateModel.create({
        datetime: req.body.datetime,
        rate: req.body.rate,
        userId: req.body.userId,
    }).then((result) => {
        console.log('HeartRate Successfully Created');
        res.redirect('/');
    }, (error) => {
        console.error(error);
        res.redirect('/createHeartRate');
    });
}
