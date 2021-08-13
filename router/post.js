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
    res.status(200).send({message: "API to interact with post"})
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
        host: req.hostname,
        approved_time: "", 
        approved_admin: ""
    })
    post.save((err, data)=> {
        if (err) throw res.status(500).send({message: "Error", err})
        res.status(200).send({message: "OK", id: data._id})
    })
})

router.get('/info/:idpost', (req, res)=>{
    Post.findById(req.params.idpost)
    .then ((data)=>{
        data.ip = ""
        res.status(200).send(data)
    })
    .catch ((err)=> {
        res.status(404).send({message: "Post not found"})
    })
})

router.delete('/delete/:idpost', (req, res)=> {
    Post.deleteOne({_id: req.params.idpost, approved: false})
    .then((dataDeleted)=>{
        if (dataDeleted.deletedCount > 0) {res.status(200).send({message: "Deleted post"})}
        else res.status(405).send({message: "Delete failed because the post was approved by the administrator."})
    })
    .catch((err)=> {
        res.status(500).send({message: "Error when delete", err})
    })
})

module.exports = router