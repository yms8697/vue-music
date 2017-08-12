var express = require('express')
var router = express.Router()
const { createRequest } = require('../util/util')

router.get('/', (req, res) => {
  createRequest('/api/v2/banner/get', 'GET', null)
    .then(result => {
      res.setHeader('Content-Type', 'application/json')
      res.send(result)
    })
    /* eslint handle-callback-err: "warn" */
    .catch(err => {
      res.status(502).send('fetch error')
    })
})
module.exports = router
