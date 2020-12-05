import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import webSocket from "ws";
//Import Routes
import postsRoute from './routes/users';
import UserModel from "./models/User";
import {createUser, getAllUsers, getTestUsers, updateUser} from "./methods";
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


//How do we start listening to the server
const server = app.listen(3001);

const wss = new webSocket.Server({server: server});


wss.on('connection', (ws, req) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (rawData: string) => {
        const data: WS_MESSAGE_FROM_CLIENT = JSON.parse(rawData);
        switch (data.type) {
            case CREATE_USER:
                if (data.username) {
                    console.log("Trying to create User")
                    createUser(data.username)
                        .then((user) => {
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
            // should remove this user, but i don't know his id
        })
    });

    //send immediatly a feedback to the incoming connection
    ws.send(JSON.stringify({type: "MESSAGE", msg: 'Hi there, I am a WebSocket server'}));

});


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
        const interval = 1000 * 45;
        const ageInMilliseconds = 1000 * 60
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
    wss.clients.forEach((ws) => {
        const msg: WS_MESSAGE_FROM_SERVER = {
            type: UPDATE_USERS,
            users: users
        }
        ws.send(JSON.stringify(msg))
    })
}



