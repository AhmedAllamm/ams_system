const connection = require("../../db/connection");
const bcrypt = require('bcrypt');
const router=require('express').Router();
const util = require("util");

const login = async ( req, res) => {
    const data = req.body
    const {email, password} = req.body
    if(!email || ! password) return res.json ({ status : "error", error: "Please Enter youer email and password" });
    else{

        const query = util.promisify(connection.query).bind(connection); // transform query mysql --> promise to use [await/async]
        const user = await query("select * from users where email = ?", [
          req.body.email,
        ]);
            if (user.length==0) {
                res.status(404).json({ status: "error", error: "User not found." });
            };
            if (user[0]) { 
                console.log("password compare : "+ user[0].password );
                const isPasswordCorret = bcrypt.compareSync(password, user[0].password)
                if(!isPasswordCorret)
                {
                    res.status(401).json({ status: "error", error: "Invalid password." });
                }
                else
                {
                    const userData = {
                        email: data.email,
                        password: await bcrypt.hash(req.body.password, 8),
                        phone : data.phone,
                        
                        type : data.type,
                      };
                    // connection.query ("UPDATE users SET status = 'active' WHERE id = ?", result[0].id);

                    delete user[0].password;
                    delete user[0].status;

                    res.status(200).json(user[0]);
                }
            }
        
    }
}

router.post("/", login);

module.exports = login;