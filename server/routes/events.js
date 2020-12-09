const express = require('express');
const router = express.Router();
let Event = require('../models/Event');
let ShortEvent = require('../models/ShortEvent');

/**
 * get all Events
 */
router.get('/getEvents', async (req,res) => {
    try {
        const events = await ShortEvent.find();
        res.json(events);

    } catch(err) {
        res.json({message: err});
    }
});

/**
 * post a new event to the DB
 */
router.post('/', async (req,res) => {
    const event = new ShortEvent({
        name: req.body.name,
        lng: req.body.lng,
        lat: req.body.lat,
        description: req.body.description,
        date: req.body.date
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
