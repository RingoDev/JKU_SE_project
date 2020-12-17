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

module.exports = router;