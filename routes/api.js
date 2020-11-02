const express = require('express');
const router = express.Router();
const passport = require('passport');

const API = require('../controllers/api');

// security

router.post('/api/login', passport.authenticate('local', { failureMessage: 'Erro ao fazer login', failureFlash: true }), function (req, res) {
    res.send('sucess')
});

router.delete('/api/logout', (req, res) => {
    API.logOut(req, res);
});


// api test

router.get('/api', (req, res) => {
    res.send('API response');
});


// users
router.get('/api/users', async (req, res) => {
    API.getUsers(req, res);
});



// falls
router.get('/api/falls', async (req, res) => {
    API.getFalls(req, res);
});

router.post('/api/falls', function (req, res, next) {
    API.createFall(req, res);
  });
  

// heart rate
router.get('/api/heartRates', async (req, res) => {
    API.getHeartRates(req, res);
});

router.post('/api/heartRates', function (req, res, next) {
    API.createHeartRate(req, res);
  });
  

module.exports = router;
