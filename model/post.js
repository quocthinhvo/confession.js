const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    time: String,
    time_format: String,
    approved: Boolean,
    label: String,
    accuracy: Number,
    ip: String,
    host: String
})

const postModel = mongoose.model('post', postSchema)

module.exports = postModel