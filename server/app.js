const express = require('express');
//const mongoos = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/users');
app.use('/users', postsRoute);
const postsRouteEvents = require('./routes/events');
app.use('/events', postsRouteEvents);

//Routes
app.get('/', (req,res) => {
    res.send('Home');
});

//connect to MongoDB
const url = "mongodb+srv://Florian:florian@testdatabase.qipkh.mongodb.net/";

const dbName = "MyEvents";

MongoClient.connect(url, function (err, client) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server")

    const db = client.db(dbName);

    const col = db.collection("Users");

    col.find({}).toArray(function (err, docs){
        assert.strictEqual(err, null);
        //console.log("Found the following records");
        //console.log(docs);
        exports.getUser = function () {
            return docs;
        }
    });
    client.close();
});

/*
//Connect to Mongo-DB
mongoos.connect( 
    process.env.DB_CONNECTION,
   { useNewUrlParser: true }, 
   ()=> console.log('connected to DB') );*/

//How do we start listening to the server
app.listen(3001);
