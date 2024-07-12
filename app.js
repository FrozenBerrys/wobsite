require("dotenv").config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const connectDB = require('./server/config/db');
connectDB();


const app = express();

const PORT = process.env.PORT || 8000 ;


app.use(express.static('public')); // serving static files via express
app.use(expressLayout); // using ejs layouts
app.set('layout', './layouts/main'); // layout of the website will be @ ./layouts/main
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main')); 
// any request made to the root URL (/) or any subpath under / will be handled by the router exported from ./server/routes/main

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})