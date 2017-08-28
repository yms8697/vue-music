<template>
  <div id="recommend">
    <!--轮播组件-->
    <Scroll ref="scroll" :data="list" class="recommend-content">
      <div>
        <Carousel autoplay v-model="value2">
            <Carousel-item v-for="(item,index) in banner" :key="index">
                <div class="carousel"><img @load="loadImg" :src="item.pic"></img></div>
            </Carousel-item>
        </Carousel>
        <div class="recommend-tab">
        </div>
        <RecommendList :recommendtitle="type.personalized" :list="personalized"></RecommendList>
        <RecommendList :recommendtitle="type.newsong" :list="newsong"></RecommendList>
      </div>
    </Scroll>
  </div>
</template>
<script>
  import { getBanner, getPersonalized, getNewsong } from '@/api/getData.js'
  import RecommendList from '@/components/recommendlist/recommendlist.vue'
  import Scroll from '@/base/scroll.vue'
  import {playlistMixin} from '@/common/js/mixin'
  const ERR_OK = 200
  export default {
    mixins: [playlistMixin],
    data () {
      return {
        banner: [],
        value2: 0,
        personalized: [],
        newsong: [],
        type: {
          personalized: '推荐歌单',
          newsong: '最新音乐'
        }
      }
    },
    computed: {
      list () {
        let list = [...this.banner, ...this.personalized, ...this.newsong]
        return list
      }
    },
    components: {
      RecommendList,
      Scroll
    },
    created () {
      this._getData()
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      // 当mimiplay存在时将list的bottom设成60px,防止miniplay遮挡
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.scroll.$el.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getData () {
        // 获取轮播图数据
        // setTimeout(() => {
        //   getBanner().then((res) => {
        //     if (res.data.code === ERR_OK) {
        //       this.banner = res.data.banners
        //       console.log(this.banner)
        //     }
        //   })
        // }, 2000)
        getBanner().then((res) => {
          if (res.data.code === ERR_OK) {
            this.banner = res.data.banners
          }
        })
        // 获取推荐歌单
        getPersonalized().then((res) => {
          if (res.data.code === ERR_OK) {
            this.personalized = res.data.result
          }
        })
        // 获取推荐新歌
        getNewsong().then((res) => {
          if (res.data.code === ERR_OK) {
            this.newsong = res.data.result
            for (let i = 0; i < this.newsong.length; i++) {
              this.newsong[i].picUrl = this.newsong[i].song.album.picUrl
            }
          }
        })
      },
      loadImg () {
        if (!this.check) {
          this.$refs.scroll.refresh()
          this.check = true
        }
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .recommend-content
    position :fixed
    width:100%
    top:85px
    left:0px
    bottom:0px
    overflow :hidden
    .carousel
      width:100%
      img
        width:100%
        height:100%
    .recommend-tab
      width:100%
      height:100px
      border-bottom :1px solid rgba(134, 129, 129, 0.3)
</style>
