const mongoose  = require('mongoose');
const config    = require('config');
const messages  = require('../src/utilities/static_messages');

module.exports = () => {
    mongoose.connect(config.get('db'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => console.log(messages.DBCONNECTION_SUCCESS_TEXT))
        .catch(err => console.log(messages.DBCONNECTION_FAILURE_TEXT, err));
}
