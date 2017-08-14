import axios from 'axios'
export function getBanner () {
  return axios.get('/banner')
}
export function getPlaylist () {
  return axios.get('/top/playlist')
}
export function getHighquality () {
  return axios.get('/top/playlist/highquality')
}
export function getPersonalized () {
  return axios.get('/personalized')
}
export function getNewsong () {
  return axios.get('/personalized/newsong')
}

