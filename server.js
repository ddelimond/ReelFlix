const mongoose = require('mongoose');
const express = require('express');
const movieUser = require('./models/movieusers');
const port = process.env.port || 8000
const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const { basename } = require('path');
require('dotenv').config()
const app = express();
let bodyParser = require('body-parser');



// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get(express.urlencoded({ extended: true }));



// connect to Database
// mongoose.connect(
//     process.env.connectionStr,
//     { useNewUrlParser: true },
//     console.log('Connected to your Db!')
// );

app.get('/', async (req, res) => {
    const popUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDBKey}`
    let popRes = await fetch(popUrl);
    let popData = await popRes.json();
    let date = new Date().getFullYear()
    res.render('index.ejs', { movieData: popData, date: date });
})

app.get('/query', async (req, res) => {

    if (req.url === '/query?search=') {
        res.redirect('/')
    } else {
        let query = await path.basename(req.url).split('').slice(13).join('');

        let searchResultRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDBKey}&query=${query}`)
        let searchResults = await searchResultRes.json();
        let date = new Date().getFullYear()
        res.render('searchresults.ejs', { movieData: searchResults, date: date })
    }
})

app.listen(PORT, '0.0.0.0')

