const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const Place = require('../models/Place');

//GETS BACK ALL THE PLACES/ENTRIES
router.get('/', async (req,res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch(err) {
        res.json({message: err});
    }
});

//SPECIFIC PLACES/ENTRY BY ID
router.get('/:placeId', async (req,res) => {
    try {
        const place =  await Place.findById(req.params.placeId);
        //const queryy =  req.query;
        res.json(place);
    }catch(err) {
        res.json({message: err});
    }
});

//SUBMITS A PLACES/ENTRY
router.post('/', async (req,res) => {
    const place = new Place({
        name: req.body.name,
        gpsposition: req.body.gpsposition,
    });
    try {
        const savedPlace = await place.save();
        res.json(savedPlace);
    }catch(err) {
        res.json({message: err});
    }
});



//DELETE PLACE/ENTRY
router.delete('/:placeId', async (req,res) => {
    try {
        const removePlace = await Place.remove({_id: req.params.placeId})
        res.json(removedPlace);
    }catch(err) {
        res.json({message: err});
    }
});

//UPDATE PLACE/ENTRY
router.patch('/:placeId', async (req, res) => {
    try {
        const place = await Place.findById(req.params.placeId); //for testing
        const body =  req.body; //for testing
        //req.params   req.body    req.query



        const updatedPlace = await Place.updateOne(
            {_id: req.params.placeId},
            {
                $set: {
                    gpsposition: req.body.gpsposition ? req.body.gpsposition : place["gpsposition"],
                    time: Date.now,
                    name: req.body.name ? req.body.name : place["name"]
                }
            },
        );

        res.json(req.body);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;