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
