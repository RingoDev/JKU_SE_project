import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


export default mongoose.model('Users', PostSchema);