const html = require('express').Router();
const path = require('path');
const uuid = require('uuid');
const {
    readFromFile,
    readAndAppend,
  } = require('../helpers/fsUtils');

// add get routes for notes.html and index.html

html.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '../public/notes.html'))
});

html.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = html;