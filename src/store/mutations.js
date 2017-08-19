import * as types from './mutations-types'
const mutations = {
  [types.SET_MUSICLIST] (state, musiclist) {
    console.log('set')
    state.musiclist = musiclist
  }
}
export default mutations
