const express = require('express');

// importing the note route
const noteRouter = require('./note');

const app = express();

app.use('/note', noteRouter);


module.exports = app;
