const express = require('express');
const { signup, signin } = require('../controllers/authController');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = express.Router();

router.post('/signup', jsonParser, signup);
router.post('/signin', jsonParser, signin);
// router.get('/signout', signout);

module.exports = router;