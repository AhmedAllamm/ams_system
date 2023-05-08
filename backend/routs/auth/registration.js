const connection = require("../../db/connection");
const bcrypt = require('bcrypt');
const router=require('express').Router();
const crypto = require("crypto");
const util = require("util");
router.post("/", async function (req, res) {
    const data =req.body ;
    console.log(data)
    if(!data.email || !data.password || !data.phone || !data.type) {
      return res.status(400).json({
        error: "Please provide correct data",
        message: "Bad Request",
      });
    }   
    else{
      connection.query("select email from users where email = ?", data.email, async (error,result,fields)=>{
        if(result[0]){  
          res.status(400).json({
            status: "error",
            error: "User already exists.",
          });
                }
        else{
          const userData = {
            email: data.email,
            password: await bcrypt.hash(req.body.password, 8),
            token: crypto.randomBytes(16).toString("hex"),
            phone : data.phone,
            type : data.type,
            id : result[1],
          };
          connection.query("INSERT INTO users set ?",
          userData,
          async(error,result,fields)=>{ 
            if(error){
              res.statusCode=500;  
              res.status(500).json({
              status: "error",
              error: "User not added.",
              });
                }
            else{
              const query = util.promisify(connection.query).bind(connection); 
              const user = await query("select * from users where email = ?", [
                data.email,
              ]);
              delete user[0].password;
              delete user[0].status;
              res.status(200).json(user[0]);
                }
          })}
      });
    }});
  module.exports = router;

  
