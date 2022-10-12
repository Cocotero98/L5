const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const app = express();
const { auth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET
  })
);

app.use(bodyParser.json()).use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/', require('./routes'));

process.on('uncaughtException', (error, source) => {
  console.log(process.stderr.fd, `Caught exception: ${error}, Exception origin: ${source}`);
});

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})


