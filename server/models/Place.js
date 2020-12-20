const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpsposition:{
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String,
        required: false
    }


});

module.exports = mongoose.model('Places', PostSchema);