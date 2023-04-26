
const connection = require("../db/connection");
const moment = require("moment");
const router=require('express').Router();
const util = require('util');


// Get active auctions
router.get('/', (req, res) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  connection.query('SELECT * FROM auction WHERE start_date<=?AND end_date> ?', [now,now], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to get active auctions'
      });
    
    } else {
      res.json(results);
    }
  });
});
/*
// Finish auctions that have reached their end date
router.post('/finish', (req, res) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  connection.query('UPDATE auction SET status = "finished" WHERE endTime <= ? AND status != "finished"', [now], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to finish auctions'
      });
    } else {
      res.json({
        message: 'Auctions finished!'
      });
    }
  });
});
*/
module.exports = router;
