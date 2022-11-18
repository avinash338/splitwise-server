module.exports = {
    dataValidationConstants: {
        USER: {
            PASSWORD        : { MIN_LENGTH: 5, MAX_LENGTH: 500 }
        }
    },

    contentType: {
        JSON                : { "Content-Type": "application/json" }
    },

    statusCode: {
        SUCCESS             : 200, // SUCCESS
        BAD_REQUEST         : 400, // INVALID DATA IN REQUEST
        UNAUTHORIZED        : 401, // ABSENCE OF TOKEN IN REQ HEADER
        FORBIDDEN           : 403, // TOKEN EXISTS, BUT INVALID[EXPIRED]
        CONFLICT            : 409, // REQUEST DATA ALREADY EXISTS IN DB
        UNPROCESSABLE_ENTITY: 422, // REQUEST DATA NOT FOUND IN DB
        SERVER_ERROR        : 500  // INTERNAL SERVER ERROR
    },

    exitCode: {
        FATAL_EXCEPTION     : 1
    },

    jwtConstants: {
        TOKEN_TIMEOUT       : 3600 // [expires for every one hour]
    },

    serverConfig: {
        PORT                : 8000
    },

    PWD_ENCRYPTION_ROUNDS   : 10,

    routes: {
        BASE_URL            : '/api',
        AUTH                : '/auth',
        USERS               : '/users',
        GROUPS              : '/groups',
        EXPENSES            : '/expenses'
    },

    collectionName : {
        USER                : 'User',
        GROUPS              : 'Groups',
        EXPENSES            : 'Expenses'
    }
}