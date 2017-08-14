const express = require('express')
const router = express()
const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {
  }
  createWebAPIRequest(
    'music.163.com',
    '/api/personalized/playlist',
    'POST',
    data,
    cookie,
    musicReq => {
      res.send(musicReq)
    },
    err => res.status(502).send('fetch error')
  )
})
module.exports = router
