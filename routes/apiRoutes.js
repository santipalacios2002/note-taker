// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



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
    console.log('chosenId!!!!!!!!!!!:', chosenId)
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      console.log(notes.length);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === chosenId) {
          notes.splice(i, 1)
          fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
            err ? console.error(err) : console.log('Commit logged!'))
        }

      }

      res.send(`Got a DELETE request for ${JSON.stringify(notes)}`)
    });
  });
  // app.post('/api/clear', (req, res) => {
  //   // Empty out the arrays of data
  //   tableData.length = 0;
  //   waitListData.length = 0;

  //   res.json({ ok: true });
  // });
};
