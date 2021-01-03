const express = require('express');
const mongoos = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const placesRoute = require('./routes/places');
app.use('/places', placesRoute);

//Routes
app.get('/', (req,res) => {
    res.send('Home');
});


//Connect to Mongo-DB
mongoos.connect( 
    process.env.DB_CONNECTION,
   { useNewUrlParser: true }, 
   ()=> console.log('connected to DB') );

//How do we start listening to the server
//app.listen(3001);

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var port = 3001;
var port2 = 3002;

app.use(express.static(__dirname + '/build'));
httpServer.listen(port, () => console.log('HTTP  webserver running on port %d', port));
httpsServer.listen(port2, () => console.log('HTTPS webserver running on port %d', port2));
