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
  // app.post('/api/clear', (req, res) => {
  //   // Empty out the arrays of data
  //   tableData.length = 0;
  //   waitListData.length = 0;

  //   res.json({ ok: true });
  // });
};
