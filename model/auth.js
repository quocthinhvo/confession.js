const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    time: String
})

const authModel = mongoose.model('user', authSchema)

module.exports = authModel