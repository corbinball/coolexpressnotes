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

  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTip = {
        title,
        text,
        tip_id: uuid(),
      };
  
      readAndAppend(newTip, './db/db.json');
      res.json(`YAY! Note added.`);
    } else {
      res.error('Error! Something went wrong');
    }
  });


  