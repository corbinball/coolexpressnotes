const express = require('express');

// importing the and note route
const apiRouter = require('./apiroutes');
const htmlRouter = require('./htmlroutes');

const app = express();


app.use('/apiroutes', apiRouter);
app.use('/htmlroutes', htmlRouter);


module.exports = app;
