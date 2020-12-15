import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import webSocket from "ws";
import http from 'http'
//Import Routes
import postsRoute from './routes/users';
import UserModel from "./models/User";
import {createUser, getAllUsers, getTestUsers, removeUser, updateUser} from "./methods";
import {
    CREATE_USER,
    MESSAGE,
    POST_LOCATION,
    UPDATE_USERS,
    USER_CREATED,
    WS_MESSAGE_FROM_CLIENT,
    WS_MESSAGE_FROM_SERVER
} from "./messageTypes";
import {User} from "./data";

dotenv.config()


const app = express();
//Middlewares
app.use(cors());
app.use(bodyParser.json());


app.use('/users', postsRoute);

//Routes
app.get('/', (reg, res) => {
    res.send('Home');
});


const expressServer = app.listen(3002);
const websocketServer = http.createServer((req, res) => {
    console.log((new Date()) + ' Received request for ' + req.url);
    res.writeHead(404);
    res.end();
})
websocketServer.listen(3001);

const socketToUser: Map<string, string> = new Map()
const wss = new webSocket.Server({server: websocketServer});

function validateData(data: any) {
    if (typeof data !== "object") throw new Error()
    if (!data.type) throw new Error()
}

wss.on('connection', (ws, req) => {

    const socketID = req.headers['sec-websocket-key']

    //connection is up, let's add a simple simple event
    ws.on('message', (rawData: string) => {

        if (!socketID) return

        try {
            validateData(JSON.parse(rawData))
        } catch {
            ws.send("Could not parse your Request")
            return
        }

        const data: WS_MESSAGE_FROM_CLIENT = JSON.parse(rawData)

        switch (data.type) {
            case CREATE_USER:
                if (data.username) {
                    console.log("Trying to create User")
                    createUser(data.username)
                        .then((user) => {
                            // combining client and socket id in map
                            socketToUser.set(socketID, user._id);
                            console.log("Sending message back")
                            const msg: WS_MESSAGE_FROM_SERVER = {
                                type: USER_CREATED,
                                user: user
                            }
                            ws.send(JSON.stringify(msg))
                            getAllUsers()
                                .then(users => updateClients(users))
                        })
                        .catch((err) => console.log(err))
                } else console.log("WS no username attribute on message")
                break;
            case MESSAGE:
                console.log(data.msg)
                break;
            case POST_LOCATION:
                if (data.user) {
                    updateUser(data.user)
                        .then(_ => {
                            // send update to all connected Clients
                            getAllUsers()
                                .then(users => updateClients(users))
                        })
                }
        }
        ws.on("close", (code, reason) => {
            const userID = socketToUser.get(socketID)
            if (!userID) console.log("Didn't have a corresponding userID to Socket ID")
            else {
                removeUser(userID)
                    .then((val) => console.log("Removed User with id " + userID, val))
                    .catch((err) => console.log("Couldn't remove User with id " + userID, err))
                socketToUser.delete(socketID)
                getAllUsers().then(users => updateClients(users))
            }
        });

        //send immediatly a feedback to the incoming connection
        ws.send(JSON.stringify({type: "MESSAGE", msg: 'Hi there, I am a WebSocket server'}));
    });
})

//Connect to Mongo-DB
mongoose.connect(
    process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '',
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
)
    .then((_value) => {
        console.log('connected to DB')
        for (let testUser of getTestUsers()) {
            UserModel.findOne({name: testUser.name},
                (_error, result) => {

                    // if there was no user with the name -> create User
                    if (result === null) {
                        console.log("Testuser was not in the db ")
                        const newUser = new UserModel(testUser)
                        newUser.save().then((result) => console.log("Testuser was saved to db ", result))

                    } else {
                        console.log("Testuser was in the db ", result)
                    }
                })
        }

        // run a cleanup every 45 seconds and delete old entries
        // const interval = 1000 * 45;
        // const ageInMilliseconds = 1000 * 60
        // setInterval(() => {
        //     console.log("Running cleanup")
        //     UserModel.find().then((users: any[]) => {
        //         for (let user of users) {
        //             if (getTestUsers().find((testUser) => testUser.name === user.name)) continue;
        //             const userDate: Date = user.date
        //             // if entry is older then a minute
        //             const now = Date.now()
        //             if ((now - userDate.getTime()) > ageInMilliseconds) {
        //                 UserModel.deleteOne({name: user.name})
        //                     .then((value) => console.log("Cleaned up " + value.deletedCount + " User"))
        //             } else {
        //                 console.log("Left a User untouched with age of " + ((now - userDate.getTime()) / 1000) + " seconds")
        //             }
        //         }
        //     })
        // }, interval);
    })
    .catch(err => console.log("Failed Connection to DB", err))

function updateClients(users: User[]) {
    console.log("Broadcasting to all clients")
    wss.clients.forEach((ws) => {
        const msg: WS_MESSAGE_FROM_SERVER = {
            type: UPDATE_USERS,
            users: users
        }
        ws.send(JSON.stringify(msg))
    })
}



