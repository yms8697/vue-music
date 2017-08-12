<template>
  <div id="findmusic">
    <!--导航栏组件-->
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <Menu-item name="1">个性推荐</Menu-item>
        <Menu-item name="2">歌单</Menu-item>
        <Menu-item name="3">主播电台</Menu-item>
        <Menu-item name="4">排行榜</Menu-item>
    </Menu>
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
        // 设置导航样式
        theme1: 'light',
        value2: 0,
        banner: []
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
    },
    comments: {
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .ivu-menu-horizontal
    height:35px
    line-height :35px
  .ivu-menu
    display :flex
    .ivu-menu-item
      flex:1
      padding:0px
      text-align :center
  .carousel
    width:100%
    height:120px
    img
      width:100%
      height:100%
</style>
