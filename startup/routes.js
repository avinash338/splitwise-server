const express       = require('express');

const auth          = require('../src/routes/auth.routes');
const users         = require('../src/routes/users.routes');
const groups        = require('../src/routes/groups.routes');
const expenses      = require('../src/routes/expenses.routes');

const { routes }    = require('../src/utilities/constants');
const router        = express.Router();

router.use(routes.AUTH      , auth);
router.use(routes.USERS     , users);
router.use(routes.GROUPS    , groups);
router.use(routes.EXPENSES  , expenses);

module.exports = router; 