const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();

const auction = require('./routs/auction.js');
const register = require('./routs/auth/registration');
const login = require('./routs/auth/login');
const logout = require('./routs/auth/logout');
const bidOnAuction = require('./routs/bidOnAuction/bidOnDesiredAuction');
const viewWonAuctions= require('./routs/viewWonAuctions.js');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname,"")));
app.use("/login",login);
app.use('/logout',logout);
app.use('/registration',register);

app.use("/auction", auction);


app.use('/auctions',bidOnAuction);

app.use("/won-auctions",viewWonAuctions );

app.listen(4000,"localhost",()=>{

    console.log("server is running");
  });
