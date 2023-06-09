const connection = require("../../db/connection");
const router=require('express').Router();
const { v4 } = require('uuid')
const util = require("util");
const bidder = require("../../middleware/bidder");
const upload = require("../../middleware/uploadImages");

// SHOW ALL AUCTIONS + SEARCH BY NAME AND CATEGORY
  router.get('/', async (req, res) => {
    const query = util.promisify(connection.query).bind(connection);
    let search = "";
    if (req.query.search){
      search = `where name LIKE '%${req.query.search}%' or category LIKE '%${req.query.search}%'`;
    }
    const auctions = await query(`select * from auction ${search}`);
    res.status(200).json(auctions);
  });
  
 
// TEST INSERT INTO DB
   router.post("/", (req, res) =>
   {
     const data = req.body;
     connection.query("insert into auction set ?", {
      image_url:data.image_url,
      name: data.name,
      description:data.description, 
      start_date:data.start_date,
      end_date:data.end_date, 
      category:data.category, 
      current_bid:data.current_bid, 
      saller_id:data.saller_id}, (err, result, fields) =>
     {
       res.json({message: 'Auction Created'});
     });
   });

// SHOW SPECIFIC AUCTION ON ADDRESS BAR
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    connection.query("select * from auction where ?", {id : id}, (err, result, fields) =>
    {
      if (result[0]){
        res.json(result[0]);
      }
      else {
        res.status(404).json({status: "error", error: 'Auction not found'})
      }
      
    })
 
  });

// UPDATE BID PRICE WITH CONDITION
  router.put("/:id",
   async (req, res) => {
    const { id } = req.params;
    const data = req.body;
  
    connection.query(
      "SELECT current_bid FROM auction WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          res.status(500).json({status: "error", error: 'Price Update Failed'});
        } else if (result.length === 0) {
          res.status(404).json({status: "error", error: 'Auction not found'});
        } else {
          const current_bid = result[0].current_bid;
          if (data.current_bid > current_bid) {
            connection.query(
              "UPDATE auction LEFT JOIN transactions ON auction.id = transactions.auction_id SET auction.current_bid = ?, transactions.amount = ? WHERE auction.id = ?",
              [data.current_bid, data.current_bid, id],
              (err, result) => {
                if (err) {
                  res.status(500).json({status: "error", error: 'Price Update Failed'});
                } else {
                  res.json({ message: "Updated" });
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