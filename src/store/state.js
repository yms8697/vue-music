import {playMode} from '@/common/js/config'
const state = {
  musicList: {},
  // 播放状态
  playing: false,
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 播放模式
  mode: playMode.sequence,
  currentIndex: -1,
  // 顺序播放列表
  sequenceList: [],
  bgstyle: true
}
export default state
