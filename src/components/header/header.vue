<template>
  <div class="header">
    <div class="menu">
      <span class="icon-menu"></span>
    </div>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/mymusic">
        <span class="icon-music"></span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/findmusic">
        <span class="icon-wangyi"></span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/community">
        <span class="icon-community"></span>
      </router-link>
    </div>
    <router-link tag="div" class="search" to="/search"><Icon type="ios-search-strong"></Icon></router-link>
  </div>
</template>
<script>
  export default {
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>\
  .header
    display :flex
    width:100%
    height:50px
    background :#c62f2f
    .menu, .search
      flex:1
      padding-top: 5px
      font-size :30px
      color:#fff
      text-align :center
    .tab
      display :flex
      flex:3
      .tab-item
        flex:1
        padding-top: 5px
        font-size :30px
        color:rgba(255,255,255,0.5)
        text-align :center
      .router-link-active
        color:#fff
</style>
