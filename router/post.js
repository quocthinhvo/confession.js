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
    Post.save(req.body)
})

module.exports = router