

/*const connection = require("../db/connection");
const router = require('express').Router();

router.get("/", async (req, res) => {
    try {
        const query = "SELECT auction.*, transactions.* FROM auction INNER JOIN transactions ON auction.id = transactions.auction_id WHERE transactions.amount = (SELECT MAX(amount) FROM transactions)";
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).json({ status: "error", error: "Internal server error." });
            } else if (results.length === 0) {
                res.status(404).json({ status: "error", error: "No transactions found." });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal server error." });
    }
});

module.exports = router;*/

const connection = require("../db/connection");
const express = require('express');
const router = express.Router();

// Set up MySQL connection
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  // Retrieve auctions won by the user
  const wonQuery = `
  SELECT auction.*, transactions.amount
    FROM auction
    INNER JOIN transactions 
      ON auction.id = transactions.auction_id
    WHERE transactions.bidder_id = ? AND transactions.amount >= auction.current_bid 
    AND transactions.amount = (SELECT MAX(amount) FROM transactions WHERE auction_id = auction.id);
  `;
  connection.query(wonQuery, [userId], (error, wonResults, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    
    // Retrieve purchase history for the user
    const historyQuery = `
      SELECT auction.*, transactions .amount
      FROM auction
      INNER JOIN transactions 
        ON auction.id = transactions .auction_id
      WHERE transactions .bidder_id = ?;
    `;
    connection.query(historyQuery, [userId], (error, historyResults, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      
      res.json({
        won: wonResults,
        history: historyResults,
      });
    });
  });
});

module.exports = router;
