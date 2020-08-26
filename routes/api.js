const User = require('../models/user/user');
const Email = require('../models/user/email');
const passport = require('passport');
const notAuthenticate = require('../config/passport').notAuthenticate;
const methodOverride = require('method-override');
const express = require('express');
const router = express.Router();



require('dotenv').config();
router.use(methodOverride('_method'));


router.get('/api', async (req, res) => {
    res.send('API response')
});

router.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.send(users)
});

module.exports = router;
