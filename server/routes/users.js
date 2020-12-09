const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
let User = require('../models/User');
const mongo = require('mongodb');
const assert = require("assert");
const client = require("../app");


//GETS BACK ALL THE USER/ENTRIES
router.get('/', async (req,res) => {
    try {

        res.json(client.getUser());

        /*const users = await User.find();
        res.json(users);*/
    } catch(err) {
        res.json({message: err});
    }
});

//SUBMITS A USER/ENTRY
router.post('/', async (req,res) => {
    const user = new User({
        name: req.body.name,
        gpsposition: req.body.gpsposition,
    });
    try {
    const savedUser = await user.save();
    res.json(savedUser);
    }catch(err) {
        res.json({message: err});
    }
});

//SPECIFIC USER/ENTRY BY ID
router.get('/:userId', async (req,res) => {
    try {
    const user =  await User.findById(req.params.userId);
    res.json(user);
    }catch(err) {
        res.json({message: err});
    }
});

//DELETE USER/ENTRY
router.delete('/:userId', async (req,res) => {
    try {
   const removeUser = await User.remove({_id: req.params.userId})
   res.json(removedUser);
    }catch(err) {
        res.json({message: err});
}
});

//UPDATE USER/ENTRY
router.patch('/:userId', async (req,res) => {
    try {
    const updatedUser = await User.updateOne(
       {_id: req.params.userId}, 
       {$set: {gpsposition: req.body.gpsposition,
               time: Date.now}}
       );
   res.json(updatedUser);
    }catch(err) {
        res.json({message: err});
}
});

module.exports = router;
