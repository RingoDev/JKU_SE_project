import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now(),
        required:true
    }
});


export default mongoose.model('Users', PostSchema);