const express             = require('express');

const { authentication }  = require('../middleware/middleware');
const {
    addUser,
    getUsers }            = require('../controller/users.controller');
    

const router = express.Router();

/**
 * Adding the functionality of route based on the route path.
 * Authentication has to happen before going to functionality.
 */
router.route('/').get([authentication], getUsers);
router.route('/register').post(addUser);

module.exports = router;