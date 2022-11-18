const mongoose                          = require('mongoose');
const config                            = require('config');
const jwt                               = require('jsonwebtoken');

const { collectionName, jwtConstants }  = require('../utilities/constants');

const userSchema = new mongoose.Schema({
    name        : { type: String, required: true },
    email       : { type: String, required: true, unique: true },
    password    : { type: String, required: true }
});

/**
 * @param   {object}  user    user object. 
 * @description       This method generates the token used for authentication.
 * @returns           token
 */
userSchema.methods.generateAuthToken = (user) => {
    // _id details are storing in token along with private key and setting the token expiry time [expiry time is in sec].
    const token = jwt.sign(
        { _id: user._id },
        config.get('jwtPrivateKey'),
        { expiresIn: jwtConstants.TOKEN_TIMEOUT }
    );
    return token;
}

const User = mongoose.model(collectionName.USER, userSchema);

exports.User = User;