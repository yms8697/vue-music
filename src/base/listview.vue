<template>
  <div id="listview">
    <div class="list-title">
    </div>
    <div class="listdec">
    </div>
    <div>
      <ul class="itemlist">
        <!--<li class="item" v-for="(item,index) in list" :key="index"></li>-->
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  #listview
    position :absolute
    width:100%
    top:0px
    bottom:0px
    left:0px
    background :#FFF
  .list-title
    position :fixed
    top:0px
    width :100%
    height:60px
    background :rgba(140, 135, 135, 0.6)
    z-index :9999
  .listdec
    position :relative
    top:0px
    width:100%
    padding-top:80%
    background :#1d1d1d
</style>
