import express from 'express';
import mongoos from 'mongoose';
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

app.use('/users', postsRoute);

//Routes
app.get('/', (reg, res) => {
    res.send('Home');
});

//Connect to Mongo-DB
mongoos.connect(
    process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '',
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    (err) => console.log('connected to DB', err));

//How do we start listening to the server
app.listen(3001);
