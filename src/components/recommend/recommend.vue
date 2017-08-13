<template>
  <div id="mymusic">
    <!--轮播组件-->
    <Carousel autoplay v-model="value2">
        <Carousel-item v-for="(item,index) in banner" :key="index">
            <div class="carousel"><img :src="item.pic"></img></div>
        </Carousel-item>
    </Carousel>
  </div>
</template>
<script>
  import { getBanner } from '@/api/getData.js'
  const ERR_OK = 200
  export default {
    data () {
      return {
        banner: [],
        value2: 0
      }
    },
    created () {
      this._getBanner()
    },
    methods: {
      _getBanner () {
        getBanner().then((res) => {
          if (res.data.code === ERR_OK) {
            this.banner = res.data.banners
            console.log(this.banner)
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
