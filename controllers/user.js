const bcrypt = require('bcrypt');

require('dotenv').config();

const RoleModel = require('../config/database').RoleModel;
const UserModel = require('../config/database').UserModel;

module.exports.isAdmin = function (req, res, next) {
    if (!req.user.username) {
        res.redirect('/login');
    }

    UserModel.findOne({ where: { email: req.user.username }, include: [{ model: RoleModel }] }).then((data) => {
        user = data.get({ plain: true });
        
        if (!data) {
            return res.redirect('/login');
        }
        
        console.log('This user is:', user.role.name);

        // Check here what to do depending on user's role
        next();
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.resetToken = function (req, res) {
    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Link de redefinição de senha é inválido ou expirou.');
            return res.redirect('/forgot');
        }
        res.render('reset.ejs', { token: req.params.token });
    });
}

module.exports.getUsers = function (req, res) {
    UserModel.findAll({include: [{ model: RoleModel }], raw: true, nest: true}).then(function (entries) {
        if (entries) {
            res.render('listUsers', { data: entries });
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}

module.exports.createUser = function (req, res) { 
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(req.body.password, salt);

    
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Senhas não conferem');
        res.redirect('/createUser');
    } else {
        UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        }).then((user) => {
            user.roleId = req.body.roleId;

            user.save().then(() => {
                req.flash('success', 'Usuário criado com sucesso');
                res.render('createUser');
            }).catch((error) => {
                req.flash('error', 'Houve um erro ao salvar. Tente novamente.');
                res.redirect('/createUser');
            });
        }, (error) => {
            console.error(error);
        });
    }
}

module.exports.findUser = function (req, res) {
    UserModel.findAll({ limit: 1, where: { id: req.params.id } }).then(function (entries) {
        if (entries) {
            res.render('editUser', { data: entries });
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}

module.exports.updateUser = function (req, res) {
    UserModel.update({
        username: req.body.username,
        email: req.body.email,
        roleId: req.body.roleId
    }, { where: { id: req.params.id } }).then((user) => {
        console.log('User Successfully Updated');
        res.redirect('/users');
    }, (error) => {
        console.error(error);
    });
}

module.exports.updateUserPassword = function (req, res) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(req.body.newPassword, salt);

    UserModel.findAll({ limit: 1, where: { id: req.params.id }, raw: true, nest: true }).then(function (entries) {
        if (entries) {
            if (req.body.newPassword !== req.body.confirmNewPassword) {
                req.flash('error', 'Senhas não conferem');
                res.render('editUserPassword');
            } else {
                bcrypt.compare(req.body.oldPassword, entries[0].password, function(err, response) {
                    if (err){
                        console.error(err);
                    }
                    if (response){
                        UserModel.update({
                            password: hash
                        }, { where: { id: req.params.id } }).then((result) => {
                            console.log('User Password Successfully Updated');
                            res.redirect('/users');
                        }, (error) => {
                            console.error(error);
                        });
                    } else {
                        req.flash('error', 'Senha antiga não confere');
                        res.render('editUserPassword');
                    }
                  });
            }
        } else {
            console.log("no data exist for this id");
        }
    }, (error) => {
        console.error(error);
    });
}

module.exports.deleteUser = function (req, res) {
    UserModel.destroy({
        where: {
          id: req.params.id
        }
    }).then((user) => {
        console.log('User Successfully Deleted');
        res.redirect('/users');
    }, (error) => {
        console.error(error);
    });
}