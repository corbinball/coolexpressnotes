const notes = require('express').Router();
const uuid = require('uuid');
const {
    readFromFile,
    readAndAppend,
  } = require('../helpers/fsUtils');

//get route to return all saveds notes from the db.json file

notes.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//post route to create a new note

notes.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`YAY! Note added.`);
    } else {
      res.error('Error! Something went wrong');
    }
});

//if time, add delete route for bonus, will use writetofile

module.exports = notes;