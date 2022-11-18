const config          = require('config');

const { exitCode }    = require('../src/utilities/constants');
const  messages       = require('../src/utilities/static_messages');

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        console.log(messages.FATAL_ERROR_TEXT);
        process.exit(exitCode.FATAL_EXCEPTION);
    }
}
