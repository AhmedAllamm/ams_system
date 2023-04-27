const router = require('express').Router();
const saller = require('../middleware/saller');
const connection = require('../db/connection');
const bcrypt = require('bcrypt');




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get request => get all auctions
router.get("/", (req, res) => {
    connection.query("select * from auction", (err, result, fields) => {
        res.send(result);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get request => get a spacifice action by ID auctions
router.get("/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
      "SELECT * FROM auction WHERE id = ?",
      [id],
      (error, result, fields) => {
        if (error) {
          console.error(error); // log error message to console
          res.status(500).json({
            message: "Failed to retrieve auction"
          });
        } else if (result.length === 0) {
          res.status(404).json({
            message: `Auction with ID ${id} not found`
          });
        } else {
          res.json(result[0]);
        }
      }
    );
  });
  
  






///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Post request => save an auction
/*router.post("/", (req, res) => {
    const data = req.body;
    // INSERT INTO tableName SET column1 = 'value1', column2 = 'value2';
    // he uses this way here
    connection.query("insert into auction set ?",
        {name: data.name, description: data.description ,start_date: data.start_date ,eng_date: data.end_date},
        (err, result, fields) => {
            if (err) {
                result.statusCode = 500;
                res.send({
                    message: "Failed to save the auction"
                })

            } else {
                res.json({
                    message: "auction created !"
                })
            }
        });

});*/

// Post request => save an auction
router.post("/", (req, res) => {
    const data = req.body;
    console.log(data)
    // Check if data object exists and has a name property
    if (!data.image_url	||!data.name || !data.description || !data.start_date || !data.end_date|| !data.category || !data.current_bid|| !data.saller_id) {
        return res.status(500).json({
            message: "Invalid request. Please provide a name for the auction"

        })
    }

    connection.query("INSERT INTO auction SET ?", {
        image_url: data.image_url,
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        category: data.category,
        current_bid: data.current_bid,
        saller_id: data.saller_id
      }, (error, result, fields) => {
        if (error) {
          console.error(error); // log error message to console
          res.status(500).json({
            message: "Failed to save the auction"
          });
        } else {
          res.json({
            message: "Auction created!"
          });
        }
      });
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /*the same code but doesent show the error detailes in the console

    // INSERT INTO tableName SET column1 = 'value1', column2 = 'value2';
    // he uses this way here
    connection.query("INSERT INTO auction set ?",
        {id:data.id,nam:data.name, description: data.description ,start_date: data.start_date ,end_date: data.end_date ,saller_id: data.saller_id},
        (error, result, fields) => {
            if (error) {
                res.status(500).json({
                    message: "Failed to save the auction"
                });

            } else {
                res.json({
                    message: "auction created !"
                });
            }
        });

});*/



router.put("/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    connection.query(
      "UPDATE auction SET  image_url = ? ,name = ?, description = ?, start_date = ?, end_date = ?,category = ? ,current_bid = ?,saller_id = ? WHERE id = ?",
      [ data.image_url ,data.name, data.description, data.start_date, data.end_date, data.category,data.current_bid, data.saller_id, id],
      (error, result, fields) => {
        if (error) {
          console.error(error); // log error message to console
          res.status(500).json({
            message: "Failed to update the auction"
          });
        } else if (result.affectedRows === 0) {
          res.status(404).json({
            message: `Auction with ID ${id} not found`
          });
        } else {
          res.json({
            message: "Auction updated!"
          });
        }
      }
    );
  });
  

/*// Put request => modify a specific auction
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;
    connection.query("update auction set ? where id = ?",
        [{ name: data.name, description: data.description, start_date: data.start_date ,eng_date: data.end_date,saller_id: data.saller_id}, id], (err, result) => {
            if (err) {
                res.statusCode = 505;
                res.json({
                    message: "Failed to update the auction"
                });
            } else {
                res.json({
                    message: "auction updated successfully"
                });
            }
        });
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////

// Delete request => delete a movie
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    connection.query("delete from auction where ?", { id: id }, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.json({
                message: "failed to delete the auction",
            });
        }
        res.json({
            message: "auction deleted successfully"
        })
    });
});

module.exports = router;











































/*
const { v4 } = require('uuid');
const express = require('express');
const router = express.Router();

//const sellerAuth = require('../middleware/seller');

// this is my db connection
const connection = require('../db/connection');


const auction = [];




// Get all auctions
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM auction';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get a specific auction
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM auction WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Create a new auction
router.post('/', (req, res) => {
  const {name , description, start_date, end_date} = req.body;
  const sql = `INSERT INTO auction (name, description, start date, end date) VALUES ('${name}', '${description}', '${start_date}', '${end_date}')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Auction created successfully!');
  });
});

// Update an existing auction
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, startdate, enddate, seller_id } = req.body;
  const sql = `UPDATE auction SET name = '${name}', description = '${description}', start date = '${startdate}', end date = '${enddate}', seller_id = ${seller_id} WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Auction updated successfully!');
  });
});

// Delete an auction
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM auction WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Auction deleted successfully!');
  });
});



module.exports = router;*/