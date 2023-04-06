const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ams_db'
});
 
connection.connect((err) => {
    if (err) {
      console.error('connecting err ');
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

 
module.exports=connection;