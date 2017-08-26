import axios from 'axios'
export function search (keywords, offset) {
  return axios.get('http://localhost:3000/search', {
    params: {
      keywords: keywords,
      offset: offset
    }
  })
}

