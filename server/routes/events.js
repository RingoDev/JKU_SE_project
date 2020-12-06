const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

/**
 * get all Events
 */
router.get('/getEvents', async (req,res) => {
    try {

        res.json('Test Event Data');

    } catch(err) {
        res.json({message: err});
    }
});

/**
 * post a new event to the DB
 */
router.post('/', async (req,res) => {
    const event = new Event({
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        end: req.body.end,
        owner: req.body.owner,
    });
    try {
    const savedEvent = await event.save();
    res.json(savedEvent);
    }catch(err) {
        res.json({message: err});
    }
});

/**
 * get specific Event by Id //TODO check Path and eventId
 */
router.get('/:eventId', async (req,res) => {
    try {
    const event =  await Event.findById(req.params.eventId);
    res.json(event);
    }catch(err) {
        res.json({message: err});
    }
});

/** //TODO check Path and eventId
 * get Events in a radius around a specific location
  */
router.get('/:location', async (req,res) => {
    try {
        const events =  await Event.findById(req.params.eventId);
        res.json(user);
    }catch(err) {
        res.json({message: err});
    }
});

/** //TODO check Path and eventId
 * deletes an Event by id
 */
router.delete('/:eventId', async (req,res) => {
    try {
   const removedEvent = await Event.remove({_id: req.params.eventId})
   res.json(removedEvent);
    }catch(err) {
        res.json({message: err});
}
});

/** //TODO check Path and eventId
 * updates an Event with an specific id
 */
router.patch('/:eventId', async (req,res) => {
    try {
    const updatedEvent = await Event.updateOne(
       {_id: req.params.eventId},
       {$set: {
           //TODO add things to update
           }}
       );
   res.json(updatedEvent);
    }catch(err) {
        res.json({message: err});
}
});


module.exports = router;
