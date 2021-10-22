const express = require('express');
const path = require('path');
const api = require('./routes/apiroutes.js');
const html = require('./routes/htmlroutes.js')
//const uuid = require('uuid'); not using until delete method
const {
    readFromFile,
    readAndAppend,
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
        //note_id: uuid(), not using until delte method
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`YAY! Note added.`);
    } else {
      res.error('Error! Something went wrong');
    }
});











app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
