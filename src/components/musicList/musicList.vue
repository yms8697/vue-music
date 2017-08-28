<template>
  <div id="musiclist">
    <Scroll ref="scroll" class="musiclist-content" :data="list">
      <div>
        <div class="highquality-playlist">
          <div class="img-container">
            <img :src="highquality.coverImgUrl"></img>
          </div>
          <div class="dec">
            <h1>精品歌单</h1>
            <span class="text">{{highquality.name}}</span>
          </div>
        </div>
        <div class="playlist-select"></div>
        <div class="wrap">
          <ul class="playlist">
            <li @click="selectItem(item)" class="playlist-item" v-for="(item,index) in playList" :key="index">
              <div class="card">
                <div class="card-img">
                  <span class="headphone">
                    <Icon type="headphone"></Icon>
                    <span class="text">{{item.playCount}}</span>
                  </span>
                  <div class="person">
                    <Icon type="person"></Icon>
                    <span class="text">{{item.creator.nickname}}</span>
                  </div>
                  <img v-lazy="item.coverImgUrl"></img>
                </div>
                <div class="card-text" v-html="item.name">
                </div>
              </div>
            </li>
          </ul>
          <Spin fix v-show="!playList.length">
            <Icon type="load-c" size=35 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
      </div>
    </Scroll>
    <router-view ref="detail"></router-view>
  </div>
</template>
<script>
  import { getPlaylist, getHighquality } from '@/api/getData.js'
  import { mapMutations } from 'vuex'
  import {playlistMixin} from '@/common/js/mixin'
  import Scroll from '@/base/scroll.vue'
  const ERR_OK = 200
  export default {
    mixins: [playlistMixin],
    components: {
      Scroll
    },
    data () {
      return {
        playList: [],
        highquality: [],
        highqualityList: [],
        show: true
      }
    },
    computed: {
      list () {
        return this.playList
      }
    },
    created () {
      this._getData()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // 跳转到歌单详情页
      selectItem (item) {
        this.$router.push({
          path: `musiclist/detail?id=${item.id}`
        })
        this.setMusicList(item)
        this.show = false
      },
      _getData () {
        // 获取精品歌单数据
        getHighquality().then((res) => {
          if (res.data.code === ERR_OK) {
            this.highquality = res.data.playlists[0]
            this.highqualityList = res.data.playlists
          }
        })
        // 获取歌单数据
        getPlaylist().then((res) => {
          if (res.data.code === ERR_OK) {
            this.playList = res.data.playlists
          }
        })
      },
      ...mapMutations({
        setMusicList: 'SET_MUSICLIST'
      })

    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .musiclist-content
    position :fixed
    width:100%
    top:85px
    left:0px
    bottom:0px
    overflow :hidden
    .highquality-playlist
      position :relative
      width:100%
      height:135px
      padding :20px 10px 10px 8px
      background :#777
      overflow :hidden
      .img-container
        width:100px
        img
          width:100%
          height:100%
      .dec
        width:80%
        max-width:200px
        position :absolute
        top:20px
        left:120px
        color:#fff
        text-overflow :ellipsis
        overflow :hidden
        white-space:nowrap
        h1
          font-size :20px
          font-weight:200
        .text
          font-size :12px
          font-weight:100
    .playlist-select
      width:100%
      height:30px
    .wrap
      position :relative
      .playlist
        display :flex
        flex-direction: row
        justify-content: space-between
        flex-flow: row wrap
        list-style: none
        .playlist-item
          flex:0 0 49%
          overflow :hidden
          .card-img
            width:100%
            position :relative
            .headphone
              position :absolute
              font-size :10px
              top:0px
              right:15px
              color:rgba(255,255,255,0.9)
              .text
                margin-left :4px
            .person
              width:100px
              height:18px
              position :absolute
              left:5px
              bottom:8px
              color :#fff
              text-overflow :ellipsis
              overflow :hidden
              white-space:nowrap
              .text
                margin-left :4px
            img
              width:100%
              height:100%
          .card-text
            width:100%
            height:50px
            padding :0 10px 0 10px
            overflow :hidden
      .demo-spin-icon-load
        animation: ani-demo-spin 1s linear infinite
      @keyframes ani-demo-spin
        from 
          transform: rotate(0deg)
        50%  
          transform: rotate(180deg)
        to  
          transform: rotate(360deg)
</style>
