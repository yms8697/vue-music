import {playMode} from '@/common/js/config'
const state = {
  musicList: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  mode: playMode.sequence,
  currentIndex: -1,
  sequenceList: []
}
export default state
