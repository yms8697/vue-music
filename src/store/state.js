import {playMode} from '@/common/js/config'
const state = {
  musicList: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}
export default state
