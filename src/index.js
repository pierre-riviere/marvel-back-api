require('dotenv').config();

global.env = process.env.NODE_ENV || 'dev';
global.config = require('../config/config.json')[global.env];

const port = process.env.PORT || global.config.port;
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const plugRoutes = require('./routes');

var app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

plugRoutes(app);

app.listen(port, function () {
    console.info(`Started env ${global.env} on port ${port}`);
});

module.exports = app;
