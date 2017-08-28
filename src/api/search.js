import axios from 'axios'
const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://107.191.42.61:3000'
export function search (keywords, offset) {
  return axios.get(`${url}/search`, {
    params: {
      keywords: keywords,
      offset: offset
    }
  })
}

