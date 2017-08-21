<template>
  <div id="play" v-show='playlist.length>0'>
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="bg" :style="bgImg"></div>
        <div class="top">
          <div @click="back" class="back-icon">
            <Icon type="chevron-left"></Icon>
          </div>
          <div class="playtitle"></div>
          <div class="share"></div>
        </div>
        <div class="main">
          <div class="img-container"><img :src="currentSong.imgUrl"></div>
          <div class="icon-container">
            <div class="icon"><Icon type="android-favorite-outline"></Icon></div>
            <div class="icon"><Icon type="ios-download-outline"></Icon></div>
            <div class="icon"><Icon type="android-textsms"></Icon></div>
            <div class="icon"><Icon type="android-more-vertical"></Icon></div>
          </div>
        </div>
        <div class="footer">
          我是footer
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div @click="open" class="mini-player" v-show="!fullScreen"></div>
    </transition>
    <audio :src="currentSong.playUrl" ref="audio"></audio>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        playUrl: ''
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong'
      ]),
      song () {
        return this.currentSong
      },
      bgImg () {
        return `background:url(${this.currentSong.imgUrl});background-size:100% 100%`
      }
    },
    methods: {
      // 隐藏normalplayer
      back () {
        this.setFullScreen(false)
      },
      // 显示normalplayer
      open () {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    },
    watch: {
      currentSong () {
        this.$nextTick(() => {
          this.$refs.audio.play()
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
      .back-icon
        flex:1
        line-height :60px
        text-align :center
        color:#fff
        font-size :20px
      .playtitle
        flex:4
      .share
        flex:1
    .main
      width:100%
      position:absolute
      top:60px
      bottom:100px
      .img-container
        width:224px
        height:224px
        margin :15% auto   
        img 
          width:100%
          height:100%
          border-radius:50%
      .icon-container
        display :flex
        width:80%
        height:30px
        margin :0 auto
        .icon
          flex:1
          text-align :center
          line-height :30px
          color:#fff
          font-size :30px
    .footer
      position :absolute
      bottom:0px
      width :100%
      height:100px
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
    position :fixed
    width:100%
    height:50px
    bottom:0px
    background :#fff
    &.mini-enter-active, &.mini-leave-active
      transition :all 0.5s
    &.mini-enter, &.mini-leave-to
      opacity :0
      transform :translate3d(-100%,0,0)
</style>
