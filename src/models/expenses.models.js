const mongoose              = require('mongoose');

const { collectionName }    = require('../utilities/constants');

const transactionSchema = new mongoose.Schema({
    name    : { type: String , required: true },
    amount  : { type: Number, required: true }
})

const expenseSchema = new mongoose.Schema({
    description : { type: String , required: true, unique: true },
    paidBy      : { type: transactionSchema , required: true},
    loanAmount  : { type: Number, required: true },
    transactions: [ transactionSchema ]
})

const Expense = mongoose.model(collectionName.EXPENSES, expenseSchema);

exports.Expense = Expense;