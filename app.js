const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

// const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json()).use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/', require('./routes'));

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})