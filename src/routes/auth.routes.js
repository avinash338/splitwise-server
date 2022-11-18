const express                       = require('express');

const { doLogin, resetPassword }    = require('../controller/auth.controller');

const router = express.Router();

router.route('/login').post(doLogin);
router.route('/resetPassword').post(resetPassword);

module.exports = router;