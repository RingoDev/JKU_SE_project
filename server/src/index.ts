import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
import postsRoute from './routes/users';
import User from "./models/User";

app.use('/users', postsRoute);

//Routes
app.get('/', (reg, res) => {
    res.send('Home');
});

//Connect to Mongo-DB
mongoose.connect(
    process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '',
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},)
    .then((_value) => {
        console.log('connected to DB')

        // run a cleanup every 45 seconds and delete old entries
        const interval = 1000 * 45;
        const ageInMilliseconds = 1000 * 60
        setInterval(() => {
            console.log("Running cleanup")
            User.find().then((users: any[]) => {
                for (let user of users) {
                    const userDate: Date = user.date
                    // if entry is older then a minute
                    const now = Date.now()
                    if ((now - userDate.getTime()) > ageInMilliseconds) {
                        User.deleteOne({name: user.name})
                            .then((value) => console.log("Cleaned up " + value.deletedCount + " User"))
                    } else {
                        console.log("Left a User untouched with age of " + ((now - userDate.getTime())/1000 )+" seconds")
                    }
                }
            })
        }, interval);
    })
    .catch((err) => {
        console.log("Failed Connection to DB", err)
    })


//How do we start listening to the server
app.listen(3001);




