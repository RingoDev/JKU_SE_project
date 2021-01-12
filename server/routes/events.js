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
 * deletes an Event by id
 */
router.delete('/delete/:eventId', async (req,res) => {
    try {
       const removedEvent = await ShortEvent.remove({_id: req.params.eventId})
       res.json(removedEvent);
    }catch(err) {
        res.json({message: err});
}
});

module.exports = router;
