import axios from 'axios'
export function getBanner () {
  return axios.get('http://localhost:3000/banner')
}
export function getPlaylist () {
  return axios.get('http://localhost:3000/top/playlist')
}
export function getHighquality () {
  return axios.get('http://localhost:3000/top/playlist/highquality')
}
export function getPersonalized () {
  return axios.get('http://localhost:3000/personalized')
}
export function getNewsong () {
  return axios.get('http://localhost:3000/personalized/newsong')
}
export function getListDetail (id) {
  return axios.get('http://localhost:3000/playlist/detail', {
    params: {
      id: id
    }
  })
}
export function getPlayUrl (id) {
  return axios.get('http://localhost:3000/music/url', {
    params: {
      id: id
    }
  })
}
export function getLyric (id) {
  return axios.get('http://localhost:3000/lyric', {
    params: {
      id: id
    }
  })
}

