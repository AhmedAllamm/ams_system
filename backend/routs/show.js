const connection = require("../db/connection");
const moment = require("moment");
const router = require('express').Router();

const util = require('util');
router.get("/:id", async (req, res) => {
    try {
        const query = util.promisify(connection.query).bind(connection);
        const activityHistory = await query(
            "SELECT auction .name, transactions.bidder_id, transactions.amount \
            FROM auction  \
            JOIN transactions  ON auction.id = transactions.auction_id \
            JOIN (SELECT auction_id, MAX(amount) as max_amount \
                FROM transactions \
                GROUP BY auction_id) latest ON transactions.auction_id = latest.auction_id AND transactions.amount = latest.max_amount \
            WHERE auction.saller_id = ?",
            [req.params.id]
        );
        if (!activityHistory || activityHistory.length === 0) {
            res.status(404).json({ message: "No activity history found for this seller." });
        } else {
            res.status(200).json(activityHistory);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;