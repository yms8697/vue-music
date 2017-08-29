<template>
  <div id="listview">
    <div class="play-all border-1px">
      <div class="play-icon"><i class="icon-playdetail"></i></div>
      <div class="text">播放全部(共{{list.length}}首)</div>
      <div class="select"></div>
    </div>
    <div>
      <ul class="itemlist">
        <li @click="selectItem(item, index)" class="item" v-for="(item,index) in list" :key="index">
          <div class="index" v-html="index+1"></div>
          <div class="song border-1px">
            <div class="name">{{item.name}}</div>
            <div class="album">{{item.singer}}-{{item.album}}</div>
          </div>
        </li>
      </ul>
      <Spin v-show="!list.length">
        <Icon type="load-c" size=35 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      // 点击歌单列表
      selectItem (item, index) {
        this.$emit('select', item, index)
      }
    },
    props: {
      list: {
        type: Array
      }
    },
    computed: {
      bgStyle () {
        return `background:url(${this.img});background-size:100%`
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../common/stylus/mixin.styl"
  .list-title
    position :fixed
    display:flex
    top:0px
    width :100%
    height:60px
    background :rgba(255, 255, 255, 0.05)
    z-index :9
    font-size :16px
    color:#fff
    line-height :60px
    .back-icon, .search-icon, .list-icon
      flex:1
      text-align :center
      font-size :24px
    .text
      flex: 4
  .blur
    width:100%
    position :absolute
    top:0px
    bottom :0px
    left:0px
    filter: blur(60px)
  .listdec
    position :relative
    width:100%
    padding-top:70%
    background :#1d1d1d
    overflow :hidden
    z-index :8
    .wrap
      display:flex
      position :absolute
      top:60px
      padding-left:20px
      filter: blur(0px)
      .bg-img
        flex : 0 0 35%
        img
          width:100%
          height:100%
      .dec
        flex:1
        padding:10px 0 0 10px
        h1
          font-size :18px
          color:#fff
          font-weight:200
  .play-all
    width:100%
    height:60px
    display:flex
    line-height :60px
    border-1px(rgba(7,17,27,0.5))
    .play-icon
      flex:1
      height:100%
      text-align :center
      font-size :24px
    .text
      flex:4
      height:100%
    .select
      flex:1
      height:100%
  .ivu-spin
    margin-top:30px
    .demo-spin-icon-load
        animation: ani-demo-spin 1s linear infinite
    @keyframes ani-demo-spin
      from 
        transform: rotate(0deg)
      50%  
        transform: rotate(180deg)
      to  
        transform: rotate(360deg)
  .item
    display :flex
    .index
      flex: 0 0 10%
      text-align:center
      line-height :50px
    .song
      flex:1
      padding :5px 0px
      border-1px(rgb(195, 194, 194))
      .name
        font-size :14px
        width:200px
        overflow :hidden
        text-overflow :ellipsis
        white-space:nowrap
      .album
        color:#7b7b7b
        width:200px
        overflow :hidden
        text-overflow :ellipsis
        white-space:nowrap
</style>
