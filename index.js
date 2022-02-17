const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const jwt = require('express-jwt');

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
const User = require('./models/userModel');
const userRouter = require('./routes/userRouter')(User);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/dataAPI');

app.all('/api/*',jwt({
    secret:'mySecretKey',
    algorithms:['HS256'] 
  }).unless( {path: ['/api/users/login']} ));
app.use('/api', bookRouter,userRouter);
  
app.listen(8080);
