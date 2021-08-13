const express = require('express')
const knn = require('../lib/knn/main')
const router = express.Router()

router.get('/', (req, res)=> {
    res.status(200).send(knn.check_sensitive(req.query.word))
})

module.exports = router