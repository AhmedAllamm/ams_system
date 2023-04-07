const connection = require("../../db/connection");
const bcrypt = require('bcrypt');
const router=require('express').Router();

const login = async ( req, res) => {
    const {email, password} = req.body
    if(!email || ! password) return res.json ({ status : "error", error: "Please Enter youer email and password" });
    else{
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
            if (result.length==0) {
                res.statusCode=500;
                res.json({message:"user not found"})
            };
            if (result[0]) { 
                console.log("password compare : "+ result[0].password );
                const isPasswordCorret = bcrypt.compareSync(password, result[0].password)
                if(!isPasswordCorret)
                {
                    res.json({ message: "Invalid password" });
                }
                else
                {
                    connection.query ("UPDATE users SET status = 'active' WHERE id = ?", result[0].id);

                    delete result[0]['password']
                    result[0].status = "active";
                    res.json({
                        result,
                        status: "success",
                        message: "user has been logged in"
                    });
                }
            }
        });
    }
}

router.post("/", login);

module.exports = login;