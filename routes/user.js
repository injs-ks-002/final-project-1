const express = require('express')
const router = express.Router();
const controllerUser = require('../controllers/user.controller')

router.post('/register', controllerUser.signup);
router.post('/login', controllerUser.signIn);

module.exports = router