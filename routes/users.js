const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthController = require('../controllers/auth');
const EmailController = require('../controllers/email');
const UserController = require('../controllers/user');

const notAuthenticate = require('../config/passport').notAuthenticate;
const authenticationMiddleware = require('../config/passport').authenticationMiddleware;


router.get('/login', notAuthenticate, function (req, res, next) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function (req, res) {
    AuthController.setCookie(req, res);
});

router.delete('/logout', (req, res) => {
    AuthController.logOut(req, res);
});

router.get('/forgot', function (req, res, next) {
    res.render('forgot');
});

router.post('/forgot', function (req, res) {
    EmailController.emailSenderForgotPassword(req, res);
});

router.get('/reset/:token', function (req, res) {
    UserController.resetToken(req, res);
});

router.post('/reset/:token', function (req, res) {
    EmailController.emailSenderResetPassword(req, res);
});

router.get('/users', authenticationMiddleware, function (req, res, next) {
    UserController.getUsers(req, res);
});

router.get('/createUser', authenticationMiddleware, function (req, res, next) {
    res.render('createUser');
});

router.post('/createUser', authenticationMiddleware, function (req, res, next) {
    UserController.createUser(req, res);
});

router.get('/editUser/:id', authenticationMiddleware, function (req, res, next) {
    UserController.findUser(req, res);
  });
  
router.post('/editUser/:id', authenticationMiddleware, function (req, res, next) {
    UserController.updateUser(req, res);
});

router.get('/editPassword/:id', function (req, res, next) {
    res.render('editUserPassword');
});

router.post('/editPassword/:id', authenticationMiddleware, function (req, res, next) {
    UserController.updateUserPassword(req, res);
});

router.get('/deleteUser/:id', authenticationMiddleware, function (req, res, next) {
    UserController.deleteUser(req, res);
});

module.exports = router;
