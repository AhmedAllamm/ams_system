const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

const app = express();

const register = require('./routs/auth/registration');
const login = require('./routs/auth/login');
const logout = require('./routs/auth/logout');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"")));
app.use("/login",login);
app.use('/logout',logout);
app.use('/registration',register);
app.listen(4000,"localhost",()=>{

    console.log("server is running");
  });