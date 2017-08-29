export const musiclist = (state) => {
  console.log('getmusiclist')
  return state.musiclist
}
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const bgstyle = state => state.bgstyle
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

