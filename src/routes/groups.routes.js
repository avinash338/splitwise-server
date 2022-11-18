const express               = require('express');

const { authentication }    = require('../middleware/middleware');

const { addGroup, 
    getGroups, 
    updateGroup }           = require('../controller/groups.controller');

const router = express.Router();

router.route('/')
    .get([authentication], getGroups)
    .post([authentication], addGroup);

router.route('/:name')
    .post([authentication], updateGroup);

module.exports = router;