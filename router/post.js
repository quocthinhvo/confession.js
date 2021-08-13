/*
    This router use for create post
*/
const express = require('express')
const Post = require('../model/post')
const knn = require('../lib/knn/main')
const knn2 = require('../lib/knn2/main')

const router = express.Router()

function checkWord(string){
    return knn2.check_sensitive(string)
}

router.get('/', (req, res)=> {
    res.status(405).send({message: "Only POST"})
})

router.post('/new', (req, res)=> {
    if (!req.body.text || req.body.text.length < 10) throw res.status(405).send({message: "Text must be at least 10 characters"})
    let checkResult = checkWord(req.body.text)
    let date = new Date()
    let post = new Post({
        text: req.body.text,
        time: date,
        time_format: `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        approved: false,
        label: checkResult[1],
        accuracy: checkResult[2],
        ip: req.ip,
        host: req.hostname
    })
    post.save((err, data)=> {
        if (err) throw res.status(500).send({message: "Error", err})
        res.status(200).send({message: "OK", id: data._id})
    })
})

router.get('/info/:idpost', (req, res)=>{
    Post.findById(req.params.idpost)
    .then ((data)=>{
        res.status(200).send(data)
    })
    .catch ((err)=> {
        res.status(404).send({message: "Post not found"})
    })
})

module.exports = router