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
const postsRoute = require('./routes/users');
app.use('/users', postsRoute);

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
app.listen(3001);
