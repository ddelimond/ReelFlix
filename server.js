const mongoose = require('mongoose');
const express = require('express');
const movieUser = require('./models/movieusers');
const port = process.env.port || 8000
const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const { basename } = require('path');
require('dotenv').config();
const app = express();


// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get(express.urlencoded({ extended: true }));


// connect to Database
mongoose.connect(
    process.env.connectionStr,
    { useNewUrlParser: true },
    console.log('Connected to your Db!')
);


app.listen(port, () => {
    console.log('Server is running go catch it ...')
})











































// const server = http.createServer((req, res) => {
//     let file = path.basename(req.url);
//     let extension = path.extname(req.url);
//     let contentType;

//     if (req.url === '/') {
//         file = 'index.html';
//         filePath = path.join(__dirname, 'public', file)
//         contentType = 'text/html';
//         extension = '.html';
//     } else {

//         switch (extension) {
//             case '.css':
//                 contentType = 'text/css';
//                 filePath = path.join(__dirname, 'public', 'Css', file)
//                 break;
//             case '.jpeg':
//                 contentType = 'image/jpeg';
//                 filePath = path.join(__dirname, 'public', 'Imgs', file)
//                 break;
//             case '.jpg':
//                 contentType = 'image/jpg';
//                 filePath = path.join(__dirname, 'public', 'Imgs', file)
//                 break;
//             case '.png':
//                 contentType = 'image/png';
//                 filePath = path.join(__dirname, 'public', 'Imgs', file)
//                 break;
//             case '.js':
//                 contentType = 'text/javascript';
//                 filePath = path.join(__dirname, 'public', 'Js', file)
//                 break;
//             case '.json':
//                 contentType = 'application/json';
//                 break;
//             case '.webp':
//                 contentType = 'image/webp';
//                 filePath = path.join(__dirname, 'public', 'Imgs', file)
//                 break;
//             case '.webmanifest':
//                 contentType = 'application/manifest+json';
//                 filePath = path.join(__dirname, 'public', 'fav', file)
//                 break;
//             case '.ico':
//                 contentType = 'image/vnd.microsoft.icon';
//                 filePath = path.join(__dirname, 'public', 'fav', file)
//                 break;

//             case '.mp4':
//                 contentType = 'video/mp4';
//                 break;
//             case '.mpeg':
//                 contentType = 'video/mpeg';
//                 break;
//         }
//     }


//     console.log(req.url)
//     // console.log(file)
//     console.log(contentType)

//     res.writeHead(200, { 'Content-Type': contentType });
//     fs.readFile(filePath, (err, file) => {
//         if (err) {
//             throw err
//         } else {
//             res.end(file)
//         }
//     })
// });