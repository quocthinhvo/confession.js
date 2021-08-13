const mongoose = require('mongoose')
const dotEnv = require('dotenv').config()

const urlDatabase = process.env.DATABASE || 'mongodb://localhost:27017/confession'
mongoose.connect(urlDatabase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=> {
    console.log('Conected to database')
})
.catch ((err)=> {
    console.log('Connect to database have some error')
    console.log(err)
})