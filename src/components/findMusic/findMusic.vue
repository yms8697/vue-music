<template>
  <div id="findmusic">
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <Menu-item name="1">个性推荐</Menu-item>
        <Menu-item name="2">歌单</Menu-item>
        <Menu-item name="3">主播电台</Menu-item>
        <Menu-item name="4">排行榜</Menu-item>
    </Menu>
  </div>
</template>
<script>
  import Menu from 'iview/src/components/menu'
  export default {
    data () {
      return {
        theme1: 'light'
      }
    },
    comments: {
      Menu
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .ivu-menu-horizontal
    height:35px
    line-height :35px
</style>
