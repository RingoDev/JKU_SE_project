import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import webSocket from "ws";
import http from 'http'
//Import Routes
import getRoute from './routes/users';
import {initializeDB} from "./methods";
import middleware from "./middleware";

dotenv.config()

const app = express();
//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/users', getRoute);
//Routes
app.get('/', (reg, res) => {
    res.send('Home');
});
app.listen(3002);

const websocketServer = http.createServer((req, res) => {
    console.log((new Date()) + ' Received request for ' + req.url);
    res.writeHead(404);
    res.end();
})

websocketServer.listen(3001);

const wss = new webSocket.Server({server: websocketServer});

wss.on('connection', middleware)

//Connect to Mongo-DB
mongoose.connect(
    process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '',
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
)
    .then((_value) => {
        console.log('connected to DB')
        initializeDB();
    })
    .catch(err => console.log("Failed Connection to DB", err))





