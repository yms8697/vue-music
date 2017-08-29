<template>
  <div id="search">
    <div class="search-top">
      <div class="search-back" @click="back()"><Icon type="android-arrow-back"></Icon></div>
      <div class="input-wrapper">
        <input  class="search-input" v-model="query" placeholder="搜索音乐、歌手、歌词、用户"></input>
      </div>
    </div>
    <Scroll ref="scroll" v-show='query' class="list-wrapper" :data="searchResult" :pullup="pullup" @scrollToEnd="searchMore">
      <ul class="search-list">
        <li @click="selectItem(item)" v-for="(item, index) in searchResult" :key="index" class="item">
          <div>
            <div v-html='highLight(item.name)'></div>
            <div v-html="highLight(item.artists[0].name)+'-'+highLight(item.album.name)"></div>
          </div>
        </li>
        <Spin  v-show="hasMore">
          <Icon type="load-c" size=35 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </ul>
    </Scroll>
  </div>
</template>
<script>
  import {search} from '@/api/search'
  import {ERR_OK} from '@/common/js/config'
  import Scroll from '@/base/scroll'
  import {mapActions} from 'vuex'
  import Song from '@/common/js/song'
  import { getPlayUrl } from '@/api/getData'
  import {playlistMixin} from '@/common/js/mixin'
  export default {
    mixins: [playlistMixin],
    components: {
      Scroll
    },
    data () {
      return {
        query: '',
        searchResult: [],
        pullup: true,
        hasMore: true,
        page: 0
      }
    },
    methods: {
      // 当mimiplay存在时将list的bottom设成60px,防止miniplay遮挡
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // 高亮搜索关键词
      highLight (str) {
        let re = new RegExp(`${this.query}`, 'gim')
        str = str.replace(re, `<span class="highLight">${this.query}</span>`)
        return str
      },
      // 返回
      back () {
        this.$router.back()
      },
      // 下拉加载更多
      searchMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page * 30).then((res) => {
          if (res.status === ERR_OK) {
            // 组合数组
            this.searchResult = [...this.searchResult, ...res.data.result.songs]
            console.log(this.searchResult)
            // 判断是否还有内容，没有则将hasMore变成false
            if (this.searchResult.length >= res.data.result.songCount) {
              this.hasMore = false
            }
          }
        })
      },
      selectItem (item) {
        console.log(item)
        let song = new Song({
          id: item.id,
          name: item.name,
          singer: item.artists[0].name,
          duration: item.duration,
          album: item.album.name,
          imgUrl: item.album.picUrl
        })
        getPlayUrl(item.id).then((res) => {
          song.playUrl = res.data.data[0].url
        })
        this.insertSong(song)
      },
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query () {
        // query改变时将page重置
        this.page = 0
        search(this.query, this.page).then((res) => {
          if (res.status === ERR_OK) {
            this.searchResult = res.data.result.songs
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  #search
    position :absolute
    width:100%
    top:0px
    bottom :0px
    .search-top
      display :flex
      width :100%
      height:50px
      background :#c62f2f
      .search-back
        flex:1
        color:#fff
        text-align:center
        line-height :50px
        font-size:26px
      .input-wrapper
        flex:5
        padding :10px
        .search-input
          box-sizing: border-box
          width:100%
          height:30px
          background :rgba(255,255,255,0)
          border:none
          color:#fff
    .list-wrapper
      position :absolute
      width:100%
      top:50px
      bottom:0px
      overflow :hidden
    .search-list
      .item
        padding:10px
        .highLight
          color:blue
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
