import * as types from './mutations-types'
const mutations = {
  [types.SET_MUSICLIST] (state, musiclist) {
    console.log('set')
    state.musiclist = musiclist
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    console.log('setplaylist')
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, sequencelist) {
    console.log('sequencelist')
    state.sequenceList = sequencelist
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}
export default mutations
