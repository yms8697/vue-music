import * as types from './mutations-types'
const mutations = {
  [types.SET_MUSICLIST] (state, musiclist) {
    state.musiclist = musiclist
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, sequencelist) {
    state.sequenceList = sequencelist
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_BGSTYLE] (state, flag) {
    state.bgstyle = flag
  }
}
export default mutations
