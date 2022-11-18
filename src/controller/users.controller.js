const bcryptjs              = require('bcryptjs');

const messages              = require('../utilities/static_messages');
const { User }              = require('../models/users.models');
const { addUserSchema }     = require('../utilities/schema');
const { statusCode, 
    PWD_ENCRYPTION_ROUNDS } = require('../utilities/constants');
const { handleResponse, 
    validateInput }         = require('../utilities/utils');

getUsers = async (req, res) => {
    const result = await User.find();
    handleResponse(statusCode.SUCCESS, res, { usersData: result.map(item => ({ name: item.name, email: item.email })) });
}

addUser = async (req, res) => {
    const { error } = validateInput(req.body, addUserSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user) return handleResponse(statusCode.CONFLICT, res, { message: messages.USER_CONFLICT_TEXT });
    user = new User(req.body);
    const salt = await bcryptjs.genSalt(PWD_ENCRYPTION_ROUNDS);
    user.password = await bcryptjs.hash(user.password, salt);
    await user.save();
    handleResponse(statusCode.SUCCESS, res, { message: messages.USER_ADDED_TEXT });
}

module.exports = { addUser, getUsers }
