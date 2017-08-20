<template>
  <div id="listview">
    <div class="listdec">
      <div class="blur" :style="bgStyle"></div>
      <div class="wrap">
        <slot></slot>
        <div class="dec">
          <h1 v-html="title"></h1>
        </div>
      </div>
    </div>
    <div class="play-all">
    </div>
    <div>
      <ul class="itemlist">
        <li class="item" v-for="(item,index) in list" :key="index">
          <div class="index" v-html="index+1"></div>
          <div class="song">
            <div class="name">{{item.name}}</div>
            <div class="album">{{item.ar[0].name}}-{{item.al.name}}</div>
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
    props: {
      list: {
        type: Array
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
    },
    computed: {
      bgStyle () {
        return `background:url(${this.img});background-size:100%`
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .listdec-detail
    position :fixed
    top:0px
    bottom :0px
    left:0px
    height:100%
    width:100%
    background :#fff
    z-index:9999
    overflow:hidden
  .list-title
    position :fixed
    top:0px
    width :100%
    height:60px
    background :rgba(255, 255, 255, 0.05)
    z-index :999
    font-size :16px
    color:#fff
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
    z-index :998
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
    height:50px
    border-bottom:1px solid rgba(195, 194, 194, 0.4)
  .ivu-spin
    margin-top:30px
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
    }
  .item
    display :flex
    .index
      flex: 0 0 10%
      text-align:center
      line-height :50px
    .song
      flex:1
      padding :5px 0px
      border-bottom:1px solid rgba(195, 194, 194, 0.4)
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
