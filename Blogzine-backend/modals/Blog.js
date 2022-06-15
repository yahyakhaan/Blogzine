const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    author: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", BlogSchema);