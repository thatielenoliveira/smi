const User = require('../models/user/user');
const Email = require('../models/user/email');
const passport = require('passport');
const notAuthenticate = require('../config/passport').notAuthenticate;
const methodOverride = require('method-override');
const express = require('express');
const router = express.Router();



require('dotenv').config();
router.use(methodOverride('_method'));


router.get('/login', notAuthenticate, function (req, res, next) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res) {

    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }

    const redirectUrl = req.session.redirectTo || '/';
    delete req.session.redirectTo;

    res.redirect(redirectUrl);
}
);

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/forgot', function (req, res, next) {
    res.render('forgot');
});

router.post('/forgot', function (req, res) {
    Email.emailSenderForgotPassword(req, res);
});

router.get('/reset/:token', function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Link de redefinição de senha é inválido ou expirou.');
            return res.redirect('/forgot');
        }
        res.render('reset.ejs', { token: req.params.token });
    });
});

router.post('/reset/:token', function (req, res) {

    Email.emailSenderResetPassword(req, res);

});


module.exports = router;
