<template>
  <div id="play" v-show='playlist.length>0'>
    <div class="normal-player" v-show="fullScreen">
      <div class="bg" :style="bgImg"></div>
      <div class="top">
        <div @click="back" class="back-icon">
          <Icon type="chevron-left"></Icon>
        </div>
        <div class="title"></div>
        <div class="share"></div>
      </div>
      <div class="main">
        <div class="img-container"><img :src="this.currentSong.al.picUrl"></div>
        <div class="icon-container">
          <div class="icon"><Icon type="android-favorite-outline"></Icon></div>
          <div class="icon"><Icon type="ios-download-outline"></Icon></div>
          <div class="icon"><Icon type="android-textsms"></Icon></div>
          <div class="icon"><Icon type="android-more-vertical"></Icon></div>
        </div>
      </div>
      <div class="footer">

      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  export default {
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
        return `background:url(${this.currentSong.al.picUrl});background-size:100% 100%`
      }
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
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
      .title
        flex:4
      .share
        flex:1
    .main
      width:100%
      position:absolute
      top:60px
      bottom:100px
      .img-container
        width:70%
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
  .mini-player
    position :fixed
    width:100%
    height:50px
    bottom:0px
    background :#fff
</style>
