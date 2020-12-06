const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const User = require('../models/User');

//GETS BACK ALL THE USER/ENTRIES
router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json("asdfasdfasdfdsf");
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
router.patch('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {
                $set: {
                    gpsposition: req.body.gpsposition ? req.body.gpsposition : user["gpsposition"],
                    time: Date.now,
                    name: req.body.name
                }
            }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({message: err});
    }
});


module.exports = router;