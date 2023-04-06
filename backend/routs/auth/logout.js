const router=require('express').Router();
const connection = require("../../db/connection");

const logout = ( req, res) => {
    const {id} = req.body ;
    console.log("this id ", id);
    connection.query ("UPDATE users SET status = 'in-active' WHERE id = ?", id, (err, result) => {

        res.json({
            status: "in-active",
            message: "user has been logged out"
        });
        
        console.log("id is "+ id);
    });
}

router.post("/:id", logout);

module.exports = logout;