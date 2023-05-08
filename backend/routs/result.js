const connection=require ("../db/connection.js");
const router = require('express').Router();
const admin = require('../middleware/admin');

const util = require('util');
router.get("/",
admin,
async(req,res)=>{

        const query =util.promisify(connection.query).bind(connection);// transform sql query to promis to use (await / async)
    
        let search="";
    
        if(req.query.search){
    
    search=`where id LIKE '%${req.query.search}%'`;
    
        }
    
        const results =await query(`select * from transactions ${search}`);
    
       
    
        res.status(200).json(results);
    
    });
    
    
    
    
    module.exports=router;