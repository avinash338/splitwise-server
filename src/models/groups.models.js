const mongoose              = require('mongoose');

const { collectionName }    = require('../utilities/constants');

const groupSchema = new mongoose.Schema({
    name        : { type: String , required: true, unique: true },
    members     : { type:[String], required: true }
});

const Group = mongoose.model(collectionName.GROUPS, groupSchema);

exports.Group = Group;