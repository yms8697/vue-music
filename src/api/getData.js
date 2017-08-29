import axios from 'axios'
const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : ''
export function getBanner () {
  return axios.get(`${url}/banner`)
}
// 歌单
export function getPlaylist () {
  return axios.get(`${url}/top/playlist`)
}
// 精品歌单
export function getHighquality () {
  return axios.get(`${url}/top/playlist/highquality`)
}
// 个性推荐
export function getPersonalized () {
  return axios.get(`${url}/personalized`)
}
// 最新音乐
export function getNewsong () {
  return axios.get(`${url}/personalized/newsong`)
}
// 歌单详情数据
export function getListDetail (id) {
  return axios.get(`${url}/playlist/detail`, {
    params: {
      id: id
    }
  })
}
// 播放地址
export function getPlayUrl (id) {
  return axios.get(`${url}/music/url`, {
    params: {
      id: id
    }
  })
}
// 歌词
export function getLyric (id) {
  return axios.get(`${url}/lyric`, {
    params: {
      id: id
    }
  })
}
// 排行榜
export function getRank (idx) {
  return axios.get(`${url}/top/list`, {
    params: {
      idx: idx
    }
  })
}

