const connection = require('../db/connection');
const util = require("util") //helper

const saller = async (req, res, next)=>{
    const query =util.promisify(connection.query).bind(connection)
    const {token } = req.headers;
    const saller = await query("select * from users where token = ?",[token]);
    if(saller[0] && saller[0].type == "seller"){
        next();
    }
    
    else {
        res.statusCode = 403;
        res.send({
            message:"You are unauthorized to enter this route"
        });
    }
}

module.exports = saller;