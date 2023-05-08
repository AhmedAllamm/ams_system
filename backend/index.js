const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

const auction = require('./routs/auction.js');
const register = require('./routs/auth/registration');
const login = require('./routs/auth/login');
const logout = require('./routs/auth/logout');

const bidOnAuction = require('./routs/bidOnAuction/bidOnDesiredAuction');
const viewWonAuctions= require('./routs/viewWonAuctions.js');


const posting = require('./routs/posting');
const result = require('./routs/result');
const show =require("./routs/show")
const bidOnAuction = require('./routs/bidOnAuction/bidOnDesiredAuction');
const update = require("./routs/update.js");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("upload"));

app.use(express.static(path.join(__dirname,"")));
app.use("/login",login);
app.use('/logout',logout);
app.use('/result',result);
app.use("/posting",posting);
app.use('/show',show);
app.use('/registration',register);
app.use("/auction", auction);
app.use("/update", update)

app.use('/auctions',bidOnAuction);

app.use("/won-auctions",viewWonAuctions );

app.listen(4000,"localhost",()=>{

    console.log("server is running");
  });
