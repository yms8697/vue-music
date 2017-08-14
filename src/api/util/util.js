const Encrypt = require('./crypto.js')
const http = require('http')
function createWebAPIRequest (host, path, method, data, cookie, callback, errorcallback) {
  let musicReq = ''
  const cryptoreq = Encrypt(data)
  const httpClient = http.request({
    hostname: host,
    method: method,
    path: path,
    headers: {
      'Accept': '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'http://music.163.com',
      'Host': 'music.163.com',
      'Cookie': cookie,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',

    }
  }, function (res) {
    res.on('error', function (err) {
      errorcallback(err)
    })
    res.setEncoding('utf8')
    if (res.statusCode !== 200) {
      createWebAPIRequest(host, path, method, data, cookie, callback)
      return
    } else {
      res.on('data', function (chunk) {
        musicReq += chunk
      })
      res.on('end', function () {
        if (musicReq === '') {
          createWebAPIRequest(host, path, method, data, cookie, callback)
          return
        }
        if (res.headers['set-cookie']) {
          callback(musicReq, res.headers['set-cookie'])
        } else {
          callback(musicReq)
        }
      })
    }
  })
  httpClient.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey)
  httpClient.end()
}

function createRequest (path, method, data, callback, errorcallback) {
  return new Promise((resolve, reject) => {
    let neReq = ''
    const httpClient = http.request({
      hostname: 'music.163.com',
      method: method,
      path: path,
      headers: {
        'Referer': 'http://music.163.com',
        'Cookie': 'appver=1.5.2',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, res => {
      res.setEncoding('utf8')
      res.on('error', err => {
        reject(err)
      })
      res.on('data', chunk => {
        neReq += chunk
      })
      res.on('end', () => {
        resolve(neReq)
      })
    })
    if (method === 'POST') {
      httpClient.write(data)
    }
    httpClient.end()
  })
}
module.exports = {
  createWebAPIRequest,
  createRequest
}
