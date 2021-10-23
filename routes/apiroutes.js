const notes = require('express').Router();
const uuid = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
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

// delete route for note
notes.delete('/api/notes/:id', (req, res) => {
  const noteDid = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((title) => title.id !== noteDid);
      writeToFile('./db/db.json', result);
      res.json(`Note has been deleted`);
    });
});


module.exports = notes;