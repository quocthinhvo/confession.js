const express = require('express')
const router = express.Router()
const knn = require('../lib/knn/main')
const knn2 = require('../lib/knn2/main')

router.get('/', (req, res)=> {
    res.status(200).send(knn2.check_sensitive(req.query.word))
})

module.exports = router