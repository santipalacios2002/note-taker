// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
// ROUTING

module.exports = (app) => {

  app.get('/api/notes', (req, res) => res.json(db));

  app.post('/api/notes', (req, res) => {
    console.log(req.body)
    db.push(req.body)
    req.body.id = uuidv4();
    console.log(db)
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
      err ? console.error(err) : console.log('Commit logged!'))
    res.json(db);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const chosenId = req.params.id
    let notes = require('../db/db.json');
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === chosenId) {
        notes.splice(i, 1)
      }
    }
    writeFileAsync('./db/db.json', JSON.stringify(notes), (err) =>
      err ? console.error(err) : console.log('note deleted! New notes: ', notes)).then(() => { res.json(notes) })
  });

};
