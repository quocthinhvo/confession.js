const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv').config()


exports.checkToken = (tokenInput, next)=>{
    jwt.verify(tokenInput, process.env.TOKEN_ACCESS_KEY, (err, data)=>{
        if (err) return next(false)
        next(true)
    })
}

exports.checkToken = (tokenInput, next)=>{
    jwt.verify(tokenInput, process.env.TOKEN_ACCESS_KEY, (err, data)=>{
        if (err) return next(null)
        next(data)
    })
}

exports.getUsername = (tokenInput, next)=>{
    jwt.verify(tokenInput, process.env.TOKEN_ACCESS_KEY, (err, data)=>{
        if (err) return next(null)
        next(data.username)
    })
}

exports.getUsernameFromHeader = (req, res, next)=>{
    try 
    {
        let headerAuth = req.headers.authorization.split(' ')
        var token = headerAuth[1]
    } catch (err){
        res.status(405).send({message: "Auth empty", code: err})
    }
    jwt.verify(token, process.env.TOKEN_ACCESS_KEY, (err, data) => {
        if (err) res.status(403).send({message: "Token error", code: err}) 
        else next(data.username) 
    })
}