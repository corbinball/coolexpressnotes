const express = require('express');

const htmlRouter = require('./html');
const noteRouter = require('./note');

const app = express();

app.use('/html', htmlRouter);
app.use('/note', noteRouter);


module.exports = app;
