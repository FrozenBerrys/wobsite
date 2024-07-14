require("dotenv").config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const connectDB = require('./server/config/db');

connectDB();


const app = express();

const PORT = process.env.PORT || 8000 ;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'frozen berries',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
      }),
})) 

app.use(express.static('public')); // serving static files via express
app.use(expressLayout); // using ejs layouts
app.set('layout', './layouts/main'); // layout of the website will be @ ./layouts/main
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use('/', require('./server/routes/main')); 
// any request made to the root URL (/) or any subpath under / will be handled by the router exported from ./server/routes/main
app.use('/', require('./server/routes/admin')); 

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})