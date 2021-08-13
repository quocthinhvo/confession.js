const express = require('express');
const token = require('../middleware/token')
const Post = require('../model/post')
const router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).send({message: "welcome to admin panel"})
})

router.get('/welcome', (req, res)=> {
    token.getUsernameFromHeader(req, res, (usernameInput)=>{
        res.status(200).send({message: `Welcome ${usernameInput} login to admin panel`})
    })
})

router.put('/approve/:idpost', (req, res)=> {
    token.getUsernameFromHeader(req, res, (usernameInput)=> {
        let date = new Date()
        let postUpdate = {
            approved: true,
            approved_admin: usernameInput,
            approved_time: date
        }
        Post.findOneAndUpdate({_id:req.params.idpost, approved: false}, postUpdate)
        .then((data)=>{
            if (!data) return res.status(404).send({message: "Post not found or approved"})
            res.status(200).send({message: "OK"})
        })
        .catch((err)=>{
            res.status(404).send({message: "Error", err})
        })
    })
})

router.delete('/delete/:idpost', (req, res)=> {
    token.getUsernameFromHeader(req, res, (usernameInput)=>{
        Post.deleteOne({_id:req.params.idpost, approved: false})
        .then((dataDeleted)=>{
            if (dataDeleted.deletedCount > 0) return res.status(200).send({message: "Post deleted"})
            res.status(404).send({message: "Post not found or approved"})
        })
        .catch((err)=>{
            res.status(500).send({message: "Error when delete", err})
        })
    })
})

module.exports = router