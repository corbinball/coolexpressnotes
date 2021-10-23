const express = require('express');
const path = require('path');
const api = require('./routes/apiroutes.js');
const html = require('./routes/htmlroutes.js');
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('./helpers/fsUtils');


const PORT = process.env.port || 3001;

const app = express();

app.use('/api', api);
app.use('/html', html);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//post route to create a new note

app.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`YAY! Note added.`);
    } else {
      res.error('Error! Something went wrong');
    }
});


// delete route for note
app.delete('/api/notes/:id', (req, res) => {
    const noteDid = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((title) => title.id !== noteDid);
        writeToFile('./db/db.json', result);
        res.json(`Note has been deleted`);
      });
  });


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
