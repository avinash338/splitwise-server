// npm dependencies
const jwt                       = require('jsonwebtoken');
const config                    = require('config');

// Iternal dependencies
const messages                  = require('../utilities/static_messages');
const { handleResponse }        = require('../utilities/utils');
const { statusCode }            = require('../utilities/constants');

/**
 * @param {object}  request     Request body from data sent by end user. 
 * @param {object}  response    Response data 
 * @description     This method verifies the token and forwards the process.  
 */
authentication = (request, response, next) => {
    // Fetching the token from headers.
    const token = request.header('token');
    // If token doesn't exists, returns respective message to end user. 
    if (!token) return handleResponse(statusCode.FORBIDDEN, response, { message: messages.TOKEN_REQUIRED_TEXT });
    try {
        // Decoding the data in token.
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // Adding the decoded data to request object.
        request.user = decoded;
        // next middleware.
        next();
    } catch (ex) {
        // If token expires, returns respective message to end user. 
        return handleResponse(statusCode.UNAUTHORIZED, response, { message: messages.TOKEN_INVALID_TEXT });
    }
}

module.exports = { authentication };