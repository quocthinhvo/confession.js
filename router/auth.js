const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Auth = require('../model/auth')
const token = require('../middleware/token')
const router = express.Router()

router.get('/login', (req, res)=>{
    Auth.findOne({username: req.body.username})
    .then((dataAuth)=>{
        if (!dataAuth) return res.status(403).send({message: "Wrong username or password"})
        let checkPass = bcrypt.compareSync(req.body.password, dataAuth.password)
        if (checkPass) {
            let tokenAccess = jwt.sign({username: dataAuth.username}, process.env.TOKEN_ACCESS_KEY, {expiresIn: process.env.TIME_EXPRISE})
            return res.status(200).send({message: "OK", tokenAcces: tokenAccess})
        } else return res.status(403).send({message: "Wrong username or password"})
    })
    .catch((err)=>{
        res.status(500).send({message: "Error", err})
    })
})

router.put('/reset', (req, res)=> {
    token.getUsernameFromHeader(req, res, (usernameInput)=>{
        let passwordHash = bcrypt.hashSync(req.body.password, 10)
        let authData = {
            username: usernameInput,
            password: passwordHash
        }
        Auth.findOneAndUpdate({username: usernameInput}, authData)
        .then(()=>{
            res.status(200).send({message: "Update complete"})
        })
        .catch((err)=> {
            res.status(500).send({message: "Error", err})
        })
    })
})
module.exports = router