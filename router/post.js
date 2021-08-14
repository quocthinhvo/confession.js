/*
    This router use for create post
*/
const express = require('express')
const Post = require('../model/post')
const knn = require('../lib/knn/main')
const knn2 = require('../lib/knn2/main')
const token = require('../middleware/token')

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
        data.ip = undefined
        data.approved_admin = undefined
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
        else res.status(405).send({message: "Delete failed because post not found or approved by the administrator."})
    })
    .catch((err)=> {
        res.status(500).send({message: "Some error when delete. Maybe your ID is not correct", err})
    })
})

router.get('/all/:page', (req, res)=>{
    const dataLimit = parseInt(process.env.DATA_LIMIT) || 10
    let page = req.params.page >=1 ? req.params.page : 1
    page = page - 1
    let output = []
    Post.find({approved: false})
        .limit(dataLimit)
        .skip(page * dataLimit)
        .sort({time: -1})
        .then ((data)=>{
            for (i of data){
                i._id = null
                i.approved = undefined
                i.label = undefined
                i.accuracy = undefined
                i.ip = undefined
                i.approved_time = undefined
                i.approved_admin = undefined
                output.push(i)
            }
            res.status(200).send(output)
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
})

router.get('/search/:page', (req, res)=>{
    const dataLimit = parseInt(process.env.DATA_LIMIT) || 10
    let page = req.params.page >=1 ? req.params.page : 1
    page = page - 1 
    let output = []
    Post.find({text: {
        "$regex": req.query.query,
        "$options": "i"
    }})
    .limit(dataLimit)
    .skip(page * dataLimit)
    .then ((data)=>{
        for (i of data){
            i._id = null
            i.approved = undefined
            i.label = undefined
            i.accuracy = undefined
            i.ip = undefined
            i.approved_time = undefined
            i.approved_admin = undefined
            output.push(i)
        }
        res.status(200).send(output)
    })
    .catch((err)=>{
        res.status(500).send({message: "err", err})
    })

})

module.exports = router