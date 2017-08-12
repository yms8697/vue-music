import axios from 'axios'
export function getBanner () {
  return axios.get('/banner')
}
