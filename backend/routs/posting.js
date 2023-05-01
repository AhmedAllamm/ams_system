
const connection = require("../db/connection");
const moment = require("moment");
const router=require('express').Router();
const util = require('util');

router.post("/", (req, res) => {
  const data = req.body;

 

  
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);

  
  if (endDate <= startDate) {
    return res.status(400).json({ message: "Invalid request. End date must be after start date." });
  }
  if (endDate <= new Date()) {
    return res.status(400).json({ message: "Invalid request. Auction has already ended." });
  }
  // Insert auction into database
  connection.query(
    "INSERT INTO auction (name, description, start_date, end_date, category, current_bid, saller_id) VALUES (?,?,? ?, ?, ?, ?)",
    [data.name, data.description, startDate, endDate, data. category, data.current_bid ,data.saller_id],
    (error, result, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create auction." });
      }

      return res.status(201).json({ message: "Auction created." });
    }
  );
});
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

module.exports = router;
