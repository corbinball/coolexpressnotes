const express = require('express');

// importing the html and note routes
const htmlRouter = require('./html');
const noteRouter = require('./note');


const app = express();

app.use('/html', htmlRouter);
app.use('/note', noteRouter);


module.exports = app;
