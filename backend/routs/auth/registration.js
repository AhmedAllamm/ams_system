const connection = require("../../db/connection");
const bcrypt = require('bcrypt');
const router=require('express').Router();

const auction = [];

router.post("/", function (req, res) {
    const data =req.body ;
    console.log(data)
    if(!data.email || !data.password || !data.phone ) {
      return res.json ({
        message:"please add correct data",
      })
    }   
    else{
      connection.query("select email from users where email = ?",data.email,(error,result,fields)=>{
        if(result[0]){  
          res.json({
            message:"this user already exist",
                  });
                }
        else{
          const password = bcrypt.hashSync(data.password, 8);
          connection.query("INSERT INTO users set ?",
          {email:data.email, password:password, phone:data.phone},
          (error,result,fields)=>{ 
            if(error){
              res.statusCode=500;  
              res.json({
                message:"user not added",
                      });
                      }
            else{
            res.json({
              message:"user added",
                    });
                }
          })}
      });
    }});
  module.exports = router;

  
