const connection = require("../db/connection");
const router= require('express').Router ();
const util = require("util"); 
const admin = require('../middleware/admin');

router.get('/',
admin,
async (req, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    const users = await query('SELECT id, email, type, status FROM users WHERE type != ?', ['admin']);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.put('/:id',
admin,
async (req, res) => {
  try {
    const query = util.promisify(connection.query).bind(connection);
    const user = await query("SELECT id, email, type, status FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (user.length == 0) {
      res.status(404).json({message: "User not found." });
    } else {
      if (req.body.accept) {
        connection.query("UPDATE users SET status = 'active' WHERE id = ?", user[0].id);
        res.status(200).json({ message: "User Accepted" });
      } else if (req.body.reject) {
        connection.query("UPDATE users SET status = 'in-active' WHERE id = ?", user[0].id);
        res.status(200).json({ message: "User Rejected" });
      } else {
        res.status(400).json({ message: "Invalid request." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user status" });
  }
});


module.exports = router;