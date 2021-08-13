/*
    This router use for create post
*/
const express = require('express')
const Post = require('../model/post')

const router = express.Router()

router.get('/', (req, res)=> {
    res.status(405).send({message: "Only POST"})
})

router.post('/new', (req, res)=> {
    if (!req.body.text || req.body.text.length < 10) throw res.status(405).send({message: "Text must be at least 10 characters"})
    let date = new Date()
    let post = new Post({
        text: req.body.text,
        time: date,
        time_format: `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        ip: req.ip,
        host: req.hostname
    })
    post.save((err, data)=> {
        if (err) throw res.status(500).send({message: "Error", err})
        res.status(200).send({message: "OK"})
    })
})

module.exports = router