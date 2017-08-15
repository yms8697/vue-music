import * as types from './mutations-types'
const mutations = {
  [types.SET_MUSICLIST] (state, musiclist) {
    state.musiclist = musiclist
  }
}
export default mutations
