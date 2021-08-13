const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Auth = require('../model/auth')
exports.createAdminAccount = function (username, password){
    let passwordHash = bcrypt.hashSync(password, 10)
    let date = new Date()
    let authData = new Auth({
        username: username,
        password: passwordHash,
        role: "admin",
        time: date
    })
    authData.save()
    .then(()=>{
        console.log('User created')
    })
    .catch((err)=> {
        console.log('Error')
        console.log(err)
    })
}

exports.renderTokenKey = function(){
    return require('crypto').randomBytes(64).toString('hex')
}