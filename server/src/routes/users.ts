import express from 'express';
import UserModel from '../models/User';
import {createUser, updateUser} from "../methods";
import {WebsocketRequestHandler} from "express-ws";


const router = express.Router();

//GETS BACK ALL THE USER/ENTRIES
router.get('/', (req, res) => {
    UserModel.find().then((users) => {
        res.json(users)
    })
        .catch(err => res.json({message: err}))

});

//SUBMITS A USER/ENTRY
router.post('/', (req, res) => {
    // try to update existing user
    if (!req.body.name || !req.body._id) {
        console.log("Posted user didnt have ID or username")
        res.json({message: "Posted user didnt have ID or username"})
        return
    } else {

    }

    updateUser({name: req.body.name, _id: req.body._id})
        .then((user) => {
            res.json(user);
        })
        .catch(_err => {
            createUser(req.body.name)
                .then(value => res.json(value))
                .catch(err => res.json({message: err}))
        })
});

// export const wsMiddleware: WebsocketRequestHandler = (ws, req) => {
//     ws.on('open', () => {
//         // username
//         if (!req.body.name || typeof req.body.name !== "string") {
//             ws.close(400, "No name was specified in open Request")
//             return
//         } else {
//             console.log("Creating User with name: " + req.body.name);
//             createUser(req.body.name)
//                 .then(user => ws.send(user))
//                 .catch(err => console.log(err))
//         }
//     })
//     ws.on('message', (msg) => console.log(msg))
//
//     ws.on('close',(code,reason)=>{
//
//     })
//
// }

export default router;