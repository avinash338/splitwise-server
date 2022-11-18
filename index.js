// npm dependencies
const express                   = require('express');
const cors                      = require('cors');
const bodyParser                = require('body-parser');

// importing internal modules
const routePaths                = require('./startup/routes');
const config                    = require('./startup/config');
const dbConnect                 = require('./startup/db');

// Importing constants
const { serverConfig, routes }  = require('./src/utilities/constants');
const app                       = express();
app.use(express.json());

// Express app requires cors to be able to communicate with the frontend
app.use(cors());

// Express app requires bodyparser to extract information from body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// functions to be called while starting the app.
dbConnect();
config();

// Express app ALL routes
app.use(routes.BASE_URL, routePaths);

// Specifying the port to be used if the server doesn't have an environment variable set
const port = process.env.PORT || serverConfig.PORT;
app.listen(port, () => { console.log(`server started on ${port}`) });