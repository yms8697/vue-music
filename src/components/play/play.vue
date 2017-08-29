<template>
  <div id="play" v-show='playlist.length>0'>
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="bg" :style="bgImg"></div>
        <div class="top">
          <div @click="back" class="back-icon">
            <Icon type="chevron-left"></Icon>
          </div>
          <div class="playtitle">
            <span class="song">{{currentSong.name}}</span>
            <span class="singer">{{currentSong.singer}}</span>
          </div>
          <div class="share"><Icon type="ios-redo-outline"></Icon></div>
        </div>
        <div class="main"
          @touchstart.prevent="mainTouchStart"
          @touchmove.prevent="mainTouchMove"
          @touchend="mainTouchEnd">
          <div class="main-r" ref="mainRight">
            <div class="img-container"><img :class="rotate" :src="currentSong.imgUrl"></div>
            <div class="playing-lyric"v-show="playingLyric">{{playingLyric}}</div>
            <div class="icon-container">
              <div class="icon"><Icon type="android-favorite-outline"></Icon></div>
              <div class="icon"><Icon type="ios-download-outline"></Icon></div>
              <div class="icon"><Icon type="android-textsms"></Icon></div>
              <div class="icon"><Icon type="android-more-vertical"></Icon></div>
            </div>
          </div>
          <Scroll class="lyric-container" :data="lyric&&lyric.lines" ref='lyricList'>
            <div>
              <div v-if="lyric">
                <p ref="lyricLine" class="lyric" :class="{'current':index === lyricLineNum}" v-for="(item, index) in lyric.lines" :key="index">{{item.txt}}</p>
              </div>
              <div class="nolyric" v-else>
                暂无歌词
              </div>
            </div>
          </Scroll>
        </div>
        <div class="footer">
          <div class="progress-container">
            <div class="time">{{format(currentTime)}}</div>
            <Progress-Bar :percent="percent" @percentChange="percentChange"></Progress-Bar>
            <div class="time">{{format(currentSong.duration/1000)}}</div>
          </div>
          <div class="play-icon">
            <div class="play-item" @click.stop="changeMode"><i :class="iconMode"></i></div>
            <div @click="prev" class="play-item"><i class="icon-prevdetail"></i></div>
            <div @click="togglePlaying" class="play-item"><i :class="playIcon"></i></div>
            <div @click="next" class="play-item"><i class="icon-nextdetail"></i></div</div>
            <div class="play-item"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div @click="open" class="mini-player" v-show="!fullScreen">
        <div class="img-container"><img :src="currentSong.imgUrl"></img></div>
        <div class="text" v-html="currentSong.name"></div>
        <div @click.stop="togglePlaying" class="icon"><i :class="playIcon"></i></div>
        <div @click.stop="listShow"class="icon"><Icon type="ios-list-outline"></Icon></div>
      </div>
    </transition>
    <audio :src="currentSong.playUrl" ref="audio" @timeupdate="updatatime" @canplay="ready" @error="error" @ended="end"></audio>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ProgressBar from '@/base/progress'
  import {playMode, ERR_OK} from '@/common/js/config'
  import {shuffle} from '@/common/js/util'
  import {getLyric} from '@/api/getData'
  import Lyric from 'lyric-parser'
  import Scroll from '@/base/scroll'
  export default {
    components: {
      ProgressBar,
      Scroll
    },
    data () {
      return {
        songReady: false,
        currentTime: 0,
        lyric: null,
        lyricLineNum: 0,
        currentShow: 'cd',
        playingLyric: ''
      }
    },
    created () {
      this.touch = {}
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ]),
      // 根据播放状态改变播放按钮css样式
      playIcon () {
        return this.playing ? 'icon-pause-detail' : 'icon-playdetail'
      },
      // 根据播放状态改变cd的旋转状态
      rotate () {
        return this.playing ? 'play' : 'play pause'
      },
      // 根据播放形式改变播放样式
      iconMode () {
        return this.mode === playMode.sequence ? 'icon-music-shunxu' : this.mode === playMode.loop ? 'icon-music-danqu1' : 'icon-music-random'
      },
      bgImg () {
        return `background:url(${this.currentSong.imgUrl});background-size:100% 100%`
      },
      percent () {
        return this.currentTime / (this.currentSong.duration / 1000)
      }
    },
    methods: {
      listShow () {

      },
      // 获取歌词
      getlyric () {
        getLyric(this.currentSong.id).then((res) => {
          let data = res.data
          console.log(data)
          if (data.code === ERR_OK) {
            // 判断是否有歌词
            if (data.nolyric) {
              this.lyric = null
              this.playingLyric = ''
              this.lyricLineNum = 0
            } else {
              this.lyric = new Lyric(data.lrc.lyric, this.handleLyric)
              // 判断歌曲播放状态
              if (this.playing) {
                this.lyric.play()
              }
              console.log(this.lyric)
            }
          }
        })
      },
      handleLyric ({lineNum, txt}) {
        this.lyricLineNum = lineNum
        if (lineNum > 5) {
          let el = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(el, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      // 滑动切换
      mainTouchStart (e) {
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      mainTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        const width = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(width / window.innerWidth)
        this.$refs.lyricList.$el.style['transform'] = `translate3d(${width}px,0,0)`
        this.$refs.lyricList.$el.style['transitionDuration'] = 0
        this.$refs.mainRight.style.opacity = 1 - this.touch.percent
        this.$refs.mainRight.style['transitionDuration'] = 0
      },
      mainTouchEnd () {
        let offWidth
        let opacity
        if (this.currentShow === 'cd') {
          // 滑动距离超过屏幕一定比例时
          if (this.touch.percent > 0.5) {
            console.log(window.innerWidth)
            offWidth = -window.innerWidth
            this.currentShow = 'lyric'
            opacity = 0
          } else {
            offWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.5) {
            offWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyricList.$el.style['transform'] = `translate3d(${offWidth}px,0,0)`
        this.$refs.lyricList.$el.style['transitionDuration'] = `${time}ms`
        this.$refs.mainRight.style.opacity = opacity
        this.$refs.mainRight.style['transitionDuration'] = `${time}ms`
      },
      // 隐藏normalplayer
      back () {
        this.setFullScreen(false)
      },
      // 显示normalplayer
      open () {
        this.setFullScreen(true)
      },
      // 改变播放状态
      togglePlaying () {
        this.setPlayingState(!this.playing)
        if (this.lyric) {
          this.lyric.togglePlay()
        }
      },
      // 播放结束时播放下一首
      end () {
        // 判断是否为单曲循环模式
        if (this.mode === playMode.loop) {
          this.$refs.audio.currentTime = 0
          this.$refs.audio.play()
          // 单曲循环模式时歌词滚动到第一行
          if (this.lyric) {
            this.lyric.seek(0)
          }
        } else {
          this.next()
        }
      },
      // 改变播放模式
      changeMode () {
        // for (var j = 0; j < this.sequenceList.length; j++) {
        //   this.sequenceList[j] = 2
        // }
        let mode = (this.mode + 1) % 3
        this.setMode(mode)
        let changelist = null
        // 当播放模式是随机播放时打乱列表
        if (mode === playMode.random) {
          let randomlist = null
          changelist = shuffle(this.playlist)
          console.log(`ran:${randomlist}`)
        } else {
          changelist = this.sequenceList
        }
        this.resetCurrentIndex(changelist)
        this.setPlayList(changelist)
      },
      resetCurrentIndex (list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        console.log(index)
        this.setCurrentIndex(index)
      },
      // 下首歌
      next () {
        if (!this.songReady) {
          return
        }
        this.playingLyric = ''
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      // 上首歌
      prev () {
        if (!this.songReady) {
          return
        }
        this.playingLyric = ''
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      ready () {
        this.songReady = true
      },
      error () {
        this.songReady = true
      },
      updatatime (e) {
        this.currentTime = e.target.currentTime
      },
      // 将时间戳转化成 xx:xx形式
      format (interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      // percent改变时歌曲跳到相应时间
      percentChange (percent) {
        const currentTime = percent * this.currentSong.duration / 1000
        this.$refs.audio.currentTime = currentTime
        // 拖动进度条歌词跳转到相应位置
        if (this.lyric) {
          this.lyric.seek(currentTime * 1000)
        }
      },
      _pad (num, n = 2) {
        var len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST',
        setSequenceList: 'SET_SEQUENCE_LIST'
      })
    },
    watch: {
      currentSong (newsong, oldsong) {
        if (newsong.id === oldsong.id) {
          return
        }
        if (this.lyric) {
          this.lyric.stop()
        }

        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.audio.play()
            this.getlyric()
          }, 500)
        })
      },
      playing (newPlaying) {
        this.$nextTick(() => {
          const audio = this.$refs.audio
          newPlaying ? audio.play() : audio.pause()
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .normal-player
    position :fixed
    width:100%
    top:0px
    left:0px
    bottom:0px
    background :#1d1d1d
    z-index:999
    .bg
      width:100%
      height:100%
      filter :blur(35px)
    .top
      position :fixed
      display :flex
      top:0px
      width:100%
      height:60px
      background :rgba(255,255,255,0.1)
      .back-icon,.share
        flex:1
        line-height :60px
        text-align :center
        color:#fff
        font-size :20px
      .playtitle
        flex:4
        display:flex
        flex-direction :column
        justify-content:space-around
        color:#fff
        font-size:16px
        overflow :hidden
        text-overflow: ellipsis
        white-space:nowrap
        .singer
          font-size :14px
          color:rgba(255,255,255,0.5)
      .share
        flex:1
    .main
      width:100%
      position:absolute
      top:60px
      bottom:15%
      .main-r
        width:100%
        height:100%
        padding-top:20%
        .img-container
          width:224px
          height:224px
          margin :0 auto   
          img 
            width:100%
            height:100%
            border-radius:50%
            &.play
              animation:rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            @keyframes rotate
              0%
                transform :rotate(0)
              100%
                transform :rotate(360deg)
        .playing-lyric
          width:80%
          margin :5% auto
          color:#fff
          font-size:18px
          text-align :center
        .icon-container
          display :flex
          position :absolute
          bottom:5%
          left:10%
          width:80%
          height:30px
          .icon
            flex:1
            text-align :center
            line-height :30px
            color:#fff
            font-size :30px
      .lyric-container
        position: absolute
        padding:0 8%
        top:10%
        left:100%
        width:100%
        height:80%
        color:rgba(255,255,255,0.6)
        font-size :18px
        text-align :center
        overflow: hidden
        .current
          color:#fff
          font-size: 20px
        .lyric
          line-height:40px
    .footer
      position :absolute
      bottom:0px
      width :100%
      height:100px
      .progress-container
        height:30px
        width:90%
        display:flex
        margin :0 auto
        .time 
          flex:1
          color:#fff
          line-height :30px
          text-align :center
      .play-icon
        width:100%
        height:50px
        display :flex
        .play-item
          flex:1
          line-height :50px
          text-align :center
          font-size :36px
          color:#fff
    &.normal-enter-active, &.normal-leave-active
      transition :all 0.5s
      .top, .footer
        transition :all 1s cubic-bezier(0.86,0.18,0.82,1.32)
    &.normal-enter, &.normal-leave-to
      transform :translate3d(-100%,0,0)
      opacity :0
      .top
        transform :translate3d(0,-100px,0)
      .footer
        transform :translate3d(0,100px,0)
  .mini-player
    display:flex
    position :fixed
    width:100%
    height:60px
    bottom:0px
    background :#fff
    padding:10px
    &.mini-enter-active, &.mini-leave-active
      transition :all 0.5s
    &.mini-enter, &.mini-leave-to
      opacity :0
      transform :translate3d(-100%,0,0)
    .img-container
      flex:0 0 40px
      img
        width:100%
    .text
      flex 4
      padding-left :10px
    .icon
      flex 1
      text-align :center
      line-height:40px
      font-size:20px
</style>

