const UserModel = require('../config/database').UserModel;
const FallModel = require('../config/database').FallModel;


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
