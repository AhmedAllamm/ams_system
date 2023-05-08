/*const connection = require("../db/connection");
const moment = require("moment");
const router = require('express').Router();

const util = require('util');
router.get("/", async (req, res) => {
    try {
        const query = `
            SELECT t.*, a.title, a.description, a.end_time, a.winning_bid 
            FROM transactions t 
            JOIN auctions a ON t.auction_id = a.id
            WHERE t.amount = (SELECT MAX(amount) FROM transactions WHERE auction_id = t.auction_id)
        `;
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

module.exports = router;
