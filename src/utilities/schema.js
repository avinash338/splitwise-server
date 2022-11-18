// npm dependency
const Joi                           = require('joi');

// constant imports
const { dataValidationConstants }   = require('./constants');

/**
 * @description     This module contains the validation schemas which is used for validating the user input. 
 */
module.exports = {

    loginUserSchema : {
        email       : Joi.string().required().email(),
        password    : Joi.string().required()
    },

    addUserSchema : {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
            .min(dataValidationConstants.USER.PASSWORD.MIN_LENGTH)
            .max(dataValidationConstants.USER.PASSWORD.MAX_LENGTH)
    },

    updateUserSchema: {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
    },

    groupSchema:{
        name    : Joi.string().required(),
        members : Joi.array().required(Joi.string())
    },

    expenseSchema: {
        description : Joi.string().required(),
        loanAmount  : Joi.number().required(),
        paidBy      : Joi.object().keys(
            {
                name    : Joi.string().required(),
                amount  : Joi.number().required(),
            }
        ),
        transactions : Joi.array().required().items(
            Joi.object().keys(
                {
                    name    : Joi.string().required(),
                    amount  : Joi.number().required(),
                }
            )
        )
    }
    
}