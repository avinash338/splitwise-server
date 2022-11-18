const express                   = require('express');

const { authentication }        = require('../middleware/middleware');
const { addExpense, 
    getExpenses, 
    updateExpense,
    deleteExpense }             = require('../controller/expenses.controller');

const router                    = express.Router();

router.route('/')
    .get([authentication], getExpenses)
    .post([authentication], addExpense);

router.route('/:description')
    .put([authentication], updateExpense)
    .delete([authentication],deleteExpense);

module.exports = router;