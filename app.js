const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use('/', require('./routes'));

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})