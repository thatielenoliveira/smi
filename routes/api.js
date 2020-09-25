const express = require('express');
const router = express.Router();

const API = require('../controllers/api');

router.get('/api', (req, res) => {
    res.send('API response');
});

router.get('/api/users', async (req, res) => {
    API.getUsers(req, res);
});

module.exports = router;
