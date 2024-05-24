const express = require('express');
const { signup } = require('../controllers/authController');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router();

router.post('/signup', jsonParser, signup);
// router.post('/signin', signin);
// router.get('/signout', signout);

module.exports = router;