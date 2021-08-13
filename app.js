const express = require('express')
const app = express()
const dotEnv = require('dotenv').config()
const morgan = require('morgan')
const port = process.env.PORT || 8000
const database = require('./controller/mongo')

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(morgan("common"))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

const post = require('./router/post')
const check = require('./router/check')
const auth = require('./router/auth')
app.use('/api/post', post)
app.use('/api/check', check)
app.use('/api/auth', auth)

app.listen(port, ()=> {
    console.log(`Server running on ${port}`)
})