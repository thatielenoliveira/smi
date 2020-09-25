const UserModel = require('../config/database').UserModel;

module.exports.getUsers = async function (req, res) {
    const users = await UserModel.findAll();
    res.send(users);
}

