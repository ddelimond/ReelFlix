const mongoose = require('mongoose');
const express = require('express');
const movieUser = require('./models/movieusers');
const port = process.env.port || 8000
const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
require('dotenv').config();
const app = express();
let filename;
let contentType;
let extname = path.extname(__filename)


// middleware
app.set('view engine', 'ejs');
app.get(express.static('public'));
app.get(express.urlencoded({ extended: true }));


// connect to Database
mongoose.connect(
    process.env.connectionStr,
    { useNewUrlParser: true },
    console.log('Connected to your Db!')
)













const server = app.listen(port, () => {
    console.log('Server is running go catch it ...')
})