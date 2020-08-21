const database = require('./database.js').connection;
const Users = require('../models/user/user');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy


function findUser(email, callback) {
    
    database.sync().then(function () {
        Users.findOne({ where: { email: email }}).then((user) => {
            callback(null, user);
        }).catch(function(err){
            callback(err, null);
        });
    });
}

function findUserById(id, callback) {

    database.sync().then(function () {
        Users.findByPk(id).then((user) => {
            callback(null, user);
        }).catch(function(err){
            callback(err, null);
        });
    });
}

module.exports = function(passport) {
    const authenticateUser = (email, password, done) => {
        findUser(email, (err, user) => {
            if (err) { return done(err) }

            // usuário inexistente
            if (!user) { return done(null, false, {message: 'Senha e/ou e-mail incorretos'}) }

            // comparando as senhas
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) { return done(err) }
                if (!isValid) { return done(null, false, {message: 'Senha e/ou e-mail incorretos' }) }
                return done(null, user);
            });
        });
    }

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser));

      
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => { 
        findUserById(id, (err, id) => {
            if (err) { return done(err) }

            done(null, id);
        });
    });
}

module.exports.authenticationMiddleware = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.redirectTo = req.url;
    
    req.flash('error', 'Você precisa fazer login primeiro');
    res.redirect('/login');
}

module.exports.notAuthenticate = function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}
