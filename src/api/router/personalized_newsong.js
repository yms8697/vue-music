const express = require('express')
const router = express()
const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
    type: 'recommend'
  }
  createWebAPIRequest(
    'music.163.com',
    '/api/personalized/newsong',
    'POST',
    data,
    cookie,
    musicReq => {
      res.send(musicReq)
    },
    /* eslint handle-callback-err: "warn" */
    err => res.status(502).send('fetch error')
  )
})
module.exports = router
