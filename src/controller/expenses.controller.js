const { Expense }                         = require('../models/expenses.models');
const { expenseSchema }                   = require('../utilities/schema');
const { handleResponse, validateInput }   = require('../utilities/utils');
const messages                            = require('../utilities/static_messages');
const { statusCode }                      = require('../utilities/constants');

addExpense = async (req, res) => {
    const { error } = validateInput(req.body, expenseSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let expense = await Expense.findOne({ description: req.body.description });
    if (expense) return handleResponse(statusCode.CONFLICT, res, { message: messages.EXPENSE_CONFLICT_TEXT });
    expense = new Expense(req.body);
    await expense.save();
    handleResponse(statusCode.SUCCESS, res, { message: messages.EXPENSE_ADDED_TEXT });
}

getExpenses = async (req, res) => {
    const expensesData = await Expense.find();
    handleResponse(statusCode.SUCCESS, res, { expensesData }); 
}

updateExpense = async (req, res) => {
    const { error } = validateInput(req.body, expenseSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let expense = await Expense.findOneAndUpdate({ description: req.params.description }, req.body);
    if (!expense) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.EXPENSE_NOT_FOUND_TEXT });
    handleResponse(statusCode.SUCCESS, res, { message: messages.EXPENSE_UPDATED_TEXT });
}

deleteExpense = async (req, res) => {
    let result = await Expense.findOneAndDelete({ description: req.params.description });
    if (!result) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.EXPENSE_NOT_FOUND_TEXT });
    handleResponse(statusCode.SUCCESS, res, { message: messages.EXPENSE_DELETED_TEXT });
}

module.exports = { addExpense, getExpenses, updateExpense ,deleteExpense };