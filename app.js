const express = require('express')
const app = express()
const dotEnv = require('dotenv').config()
const morgan = require('morgan')
const port = process.env.PORT || 8000
const database = require('./controller/mongo')

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(morgan("common"))

app.listen(port, ()=> {
    console.log(`Server running on ${port}`)
})
