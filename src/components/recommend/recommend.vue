<template>
  <div id="recommend">
    <!--轮播组件-->
    <Carousel autoplay v-model="value2">
        <Carousel-item v-for="(item,index) in banner" :key="index">
            <div class="carousel"><img :src="item.pic"></img></div>
        </Carousel-item>
    </Carousel>
    <RecommendList :recommendtitle="type" :list="personalized"></RecommendList>
    <RecommendList :recommendtitle="type" :list="personalized"></RecommendList>
  </div>
</template>
<script>
  import { getBanner, getPersonalized } from '@/api/getData.js'
  import RecommendList from '@/components/recommendlist/recommendlist.vue'
  const ERR_OK = 200
  export default {
    data () {
      return {
        banner: [],
        value2: 0,
        personalized: [],
        type: '推荐歌单'
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
</style>
