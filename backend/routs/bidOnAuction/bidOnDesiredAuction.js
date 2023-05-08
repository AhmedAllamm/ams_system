const connection = require("../../db/connection");
const router=require('express').Router();
const { v4 } = require('uuid')
const util = require("util");
const bidder = require("../../middleware/bidder");
const upload = require("../../middleware/uploadImages");
const moment = require("moment");

// SHOW ALL AUCTIONS + SEARCH BY NAME AND CATEGORY
  router.get('/', async (req, res) => {
    const query = util.promisify(connection.query).bind(connection);
    let search = "";
    if (req.query.search){
      search = `where name LIKE '%${req.query.search}%' or category LIKE '%${req.query.search}%'`;
    }
    const auctions = await query(`select * from auction ${search}`);
    auctions.map ((auction) => {
      auction.image_url = "http://" + req.hostname + ":4000/" + auction.image_url;
    });
    res.status(200).json(auctions);
  });
  
 
// TEST INSERT INTO DB
  //  router.post("/",
  //  bidder,
  //   async(req, res) =>
  //  {
  //   const now = moment().format('YYYY-MM-DD HH:mm:ss');
  //    const data = req.body;

  //    connection.query("INSERT INTO transactions set ?", {
  //     bidder_id:data.bidder_id,
  //     auction_id: data.auction_id,
  //     amount:data.amount, 
  //     date:now,
  //   }, (err, result, fields) =>
  //    {
  //      res.json({message: 'Auction Created'});
  //    });
  //  });

// SHOW SPECIFIC AUCTION ON ADDRESS BAR
  router.get('/:id', async(req, res) => {
    const query = util.promisify(connection.query).bind(connection);
    const auction = await query("select * from auction where id = ?", [
      req.params.id,
    ]);
    if (!auction[0]) {
      res.status(404).json({ status: "error", error: "movie not found !" });
    }
    auction[0].image_url = "http://" + req.hostname + ":4000/" + auction[0].image_url;
    res.status(200).json(auction[0]);
 
  });

// UPDATE BID PRICE WITH CONDITION
  // router.put("/:id",
  //  async (req, res) => {
  //   const { id } = req.params;
  //   const data = req.body;
  
  //   connection.query(
  //     "SELECT current_bid FROM auction WHERE id = ?",
  //     [id],
  //     (err, result) => {
  //       if (err) {
  //         res.status(500).json({status: "error", error: 'Price Update Failed'});
  //       } else if (result.length === 0) {
  //         res.status(404).json({status: "error", error: 'Auction not found'});
  //       } else {
  //         const current_bid = result[0].current_bid;
  //         if (data.current_bid > current_bid) {
  //           connection.query(
  //             "UPDATE auction LEFT JOIN transactions ON auction.id = transactions.auction_id SET auction.current_bid = ?, transactions.amount = ? WHERE auction.id = ?",
  //             [data.current_bid, data.current_bid, id],
  //             (err, result) => {
  //               if (err) {
  //                 res.status(500).json({status: "error", error: 'Price Update Failed'});
  //               } else {
  //                 res.json({ message: "Updated" });
  //               }
  //             }
  //           );
  //         } else {
  //           res.status(500).json({ status: "error", error: "Price can't be lower than bid" });
  //         }
  //       }
  //     }
  //   );
  // });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    connection.query(
      "SELECT current_bid FROM auction WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          res.status(500).json({ status: "error", error: "Price Update Failed" });
        } else if (result.length === 0) {
          res.status(404).json({ status: "error", error: "Auction not found" });
        } else {
          const current_bid = result[0].current_bid;
          if (data.current_bid > current_bid) {
            connection.query(
              "UPDATE auction SET current_bid = ? WHERE id = ?",
              [data.current_bid, id],
              (err, result) => {
                if (err) {
                  res.status(500).json({ status: "error", error: "Price Update Failed" });
                } else {
                  // Insert transaction data
                  const now = moment().format("YYYY-MM-DD HH:mm:ss");
                  connection.query(
                    "INSERT INTO transactions SET ?",
                    {
                      bidder_id: data.bidder_id,
                      auction_id: id,
                      amount: data.current_bid,
                      data: now,
                    },
                    (err, result, fields) => {
                      if (err) {
                        console.log(err)
                        res.status(500).json({ status: "error", error: "Transaction insertion failed" });
                      } else {
                        res.json({ message: "Updated" });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.status(500).json({ status: "error", error: "Price can't be lower than bid" });
          }
        }
      }
    );
  });


module.exports = router;