import axios from 'axios'
export function getBanner () {
  return axios.get('/banner')
}
export function getPlaylist () {
  return axios.get('/top/playlist')
}
