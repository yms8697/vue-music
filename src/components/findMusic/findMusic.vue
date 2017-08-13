<template>
  <div id="findmusic">
    <!--导航栏-->
    <div class="nav">
      <router-link tag="div" class="nav-item" to="/findmusic/recommend">个性推荐</router-link>
      <router-link tag="div" class="nav-item" to="/findmusic/musiclist">歌单</router-link>
      <router-link tag="div" class="nav-item" to="/findmusic/radio">主播电台</router-link>
      <router-link tag="div" class="nav-item" to="/findmusic/rank">排行</router-link>
    </div>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 设置导航样式
        theme1: 'light'
      }
    },
    comments: {
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .nav
    display :flex
    width:100%
    height:35px
    .nav-item
      flex:1
      text-align :center
      line-height :35px
    .router-link-active
      color:#f10c0c
      border-bottom:2px solid #e41414
</style>
