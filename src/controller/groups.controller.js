const { Group }         = require('../models/groups.models');
const messages          = require('../utilities/static_messages');
const { groupSchema }   = require('../utilities/schema');
const { statusCode }    = require('../utilities/constants');
const { handleResponse, 
    validateInput }     = require('../utilities/utils');


addGroup = async (req, res) => {
    const { error } = validateInput(req.body, groupSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let group = await Group.findOne({ name: req.body.name });
    if (group) return handleResponse(statusCode.CONFLICT, res, { message: messages.GROUP_CONFLICT_TEXT });
    group = new Group(req.body);
    await group.save();
    handleResponse(statusCode.SUCCESS, res, { message: messages.GROUP_ADDED_TEXT });
}

getGroups = async (req, res) => {
    const result = await Group.find();
    const groupsList = result.map(item => {
        return {
            name: item.name,
            members: item.members
        }
    })
    handleResponse(statusCode.SUCCESS, res, { groupsList });
}

updateGroup = async (req, res) => {
    const { error } = validateInput(req.body, groupSchema);
    if (error) return handleResponse(statusCode.BAD_REQUEST, res, { message: error.details[0].message });
    let group = await Group.findOneAndUpdate({ name: req.params.name }, req.body);
    if (!group) return handleResponse(statusCode.UNPROCESSABLE_ENTITY, res, { message: messages.GROUP_NOT_FOUND_TEXT });
    handleResponse(statusCode.SUCCESS, res, { message: messages.GROUP_UPDATED_TEXT });
}

module.exports = { addGroup, getGroups, updateGroup };