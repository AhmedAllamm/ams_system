//update data (to change from rejected to accepted )
const router = require('express').Router();
const connection = require('../db/connection');

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  connection.query(
    'UPDATE users SET status = ? WHERE id = ?',
    [Status, id],
    (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.json({ msg: 'rejected' });
      } else {
        const numRowsUpdated = result.affectedRows;
        if (numRowsUpdated > 0) {
          res.json({ msg: 'accepted' });
        } else {
          res.json({ msg: 'rejected' });
        }
      }
    }
  );
});

module.exports = router;