
const mongoose = require('mongoose');
const express = require('express');
const movieUser = require('./models/movieusers');
const port = process.env.port || 8000
const cors = require('cors');
const path = require('path');
const { basename } = require('path');
require('dotenv').config()
const fetch = require('node-fetch');
const app = express();




// middleware
app.set('view engine', 'ejs');
// allows application to look for all static files in the public folder
app.use(express.static('public'));
// resolves cors error
app.use(cors());
// Parses the body of incoming requests , values are parsed as strings and arrays
app.use(express.urlencoded({ extended: true }));



// W@hen user puts a request in to access the site the server fetches the popular moviews 
app.get('/', async (req, res) => {

    // api url
    const popUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDBKey}`
    // response of fetch reqest
    let popRes = await fetch(popUrl);
    // data returned from the fetch request
    let popData = await popRes.json();
    // returns the date year
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

// server listening on port 8000
app.listen(port, "0.0.0.0", () => {
    console.log('Server is running go catch it ...')
})

