// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const db = require('../db/db.json');


// ROUTING

module.exports = (app) => {

  app.get('/api/notes', (req, res) => res.json(db));

  app.post('/api/notes', (req, res) => {
    console.log(req.body)
    console.log(res)
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // } else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
    res.json(false);
  });
  // app.post('/api/clear', (req, res) => {
  //   // Empty out the arrays of data
  //   tableData.length = 0;
  //   waitListData.length = 0;

  //   res.json({ ok: true });
  // });
};
