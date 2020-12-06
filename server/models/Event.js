const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true

    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    end: {
        type: Date,
        required: true,
        default: Date.now
    },
    owner:{
        type: String,
        required: true

    },
    img:{
        type: String

    },
    maxParticipants:{
        type: String

    },
    link:{
        type: String

    },
    tickets:{
        type: String

    },
    description:{
        type: String

    },

});

module.exports = mongoose.model('Event', PostSchema);
