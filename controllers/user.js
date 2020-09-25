const UserModel = require('../config/database').UserModel;

module.exports.resetToken = function (req, res) {
    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Link de redefinição de senha é inválido ou expirou.');
            return res.redirect('/forgot');
        }
        res.render('reset.ejs', { token: req.params.token });
    });
}
