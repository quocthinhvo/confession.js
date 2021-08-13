const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    text: String,
    time: String
})

const postModel = mongoose.model('post', postSchema)

module.exports = postModel