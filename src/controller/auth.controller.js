const bcryptjs                              = require('bcryptjs');

const messages                              = require('../utilities/static_messages');
const { User }                              = require('../models/users.models');
const { statusCode, PWD_ENCRYPTION_ROUNDS } = require('../utilities/constants');
const { loginUserSchema }                   = require('../utilities/schema');
const { handleResponse, validateInput }     = require('../utilities/utils');

doLogin = async (req, res) => {
    const { error } = validateInput(req.body, loginUserSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (!user) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.EMAIL_INVALID_TEXT });
    // Fetching the password details from request body and comparing the password.
    const validPassword = await bcryptjs.compare(req.body.password, user.password);
    if (!validPassword) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.PASSWORD_INVALID_TEXT });
    // Generating JWT based on loggedin user details(object). 
    const jwtToken = user.generateAuthToken(user);
    handleResponse(statusCode.SUCCESS, res, { token: jwtToken, message: messages.SUCCESSFULL_LOGIN_TEXT }, jwtToken);
};

resetPassword = async (req, res) => {
    const { error } = validateInput(req.body, loginUserSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (!user) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.EMAIL_INVALID_TEXT });
    const salt = await bcryptjs.genSalt(PWD_ENCRYPTION_ROUNDS);
    user.password = await bcryptjs.hash(req.body.password, salt);
    await user.save();
    handleResponse(statusCode.SUCCESS, res, { message: messages.SUCCESSFUL_PASSWORD_CHANGE_TEXT });
}

module.exports = { doLogin, resetPassword }; 