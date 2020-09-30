const UserController = require('../controllers/user');

module.exports.setCookie = function (req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }

    const redirectUrl = req.session.redirectTo || '/';
    delete req.session.redirectTo;

    res.redirect(redirectUrl);
}

module.exports.logout = function (req, res) {
    req.logOut();
    res.redirect('/login');
}

module.exports.isAdminMiddleware = function (req, res, next) {
    UserController.isAdmin(req, res, next);
}