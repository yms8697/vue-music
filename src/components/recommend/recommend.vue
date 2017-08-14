<template>
  <div id="recommend">
    <!--轮播组件-->
    <Carousel autoplay v-model="value2">
        <Carousel-item v-for="(item,index) in banner" :key="index">
            <div class="carousel"><img :src="item.pic"></img></div>
        </Carousel-item>
    </Carousel>
    <div class="recommend-tab">
    </div>
    <RecommendList :recommendtitle="type.personalized" :list="personalized"></RecommendList>
    <RecommendList :recommendtitle="type.newsong" :list="newsong"></RecommendList>
  </div>
</template>
<script>
  import { getBanner, getPersonalized, getNewsong } from '@/api/getData.js'
  import RecommendList from '@/components/recommendlist/recommendlist.vue'
  const ERR_OK = 200
  export default {
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
    components: {
      RecommendList
    },
    created () {
      this._getData()
    },
    methods: {
      _getData () {
        // 获取轮播图数据
        getBanner().then((res) => {
          if (res.data.code === ERR_OK) {
            this.banner = res.data.banners
            console.log(this.banner)
          }
        })
        // 获取推荐歌单
        getPersonalized().then((res) => {
          if (res.data.code === ERR_OK) {
            this.personalized = res.data.result
            console.log(res.data.result)
          }
        })
        // 获取推荐新歌
        getNewsong().then((res) => {
          if (res.data.code === ERR_OK) {
            this.newsong = res.data.result
            for (let i = 0; i < this.newsong.length; i++) {
              this.newsong[i].picUrl = this.newsong[i].song.album.picUrl
            }
            console.log(this.newsong)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
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
