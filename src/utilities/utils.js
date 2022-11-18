// npm dependency
const Joi = require('joi');

// constant imports
const { contentType } = require('./constants');

/**
 * @param   {object}  inputData    Data entered by end user.
 * @param   {object}  schema       Schema to validate the inputData.
 * @description       This method validates the data with schema.
 * @returns           An object with error, if input data doesnt match with the schema.
 */
validateInput = (inputData, schema) => Joi.validate(inputData, schema);


/**
 * @param   {number}  status_code   Http status code.
 * @param   {object}  response      Api response.
 * @param   {object}  payload       Data to be sent to end user.
 * @param   {string}  token         Token for authentication.
 * @description       This method sends response to client with all the input params
 */
handleResponse = (status_code, response, payload, token = "") => {
    if (token !== "") {
        response.header("token", token);
    };
    response.writeHead(status_code, contentType.JSON);
    response.write(JSON.stringify(payload));
    response.end();
}

//Default export
module.exports = { validateInput, handleResponse };