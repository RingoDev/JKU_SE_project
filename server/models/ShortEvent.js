const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String
    },
    lng:{
        type: String

    },
    lat:{
        type: String

    },
    description:{
        type: String,


    },
    date:{
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('ShortEvents', PostSchema);
