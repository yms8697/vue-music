<template>
  <div id="listview">
    <div class="list-title">
      <span @click="back"><Icon type="chevron-left"></Icon></span>
    </div>
    <div class="listdec">
      <div class="blur" :style="bgStyle"></div>
      <div class="wrap">
        <div class="bg-img">
          <img :src="img">
        </div>
        <div class="dec">
          <h1 v-html="title"></h1>
        </div>
      </div>
    </div>
    <div class="play-all">
    </div>
    <div>
      <Spin  fix v-show="!list.length">
          <Icon type="load-c" size=35 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
      </Spin>
      <ul class="itemlist">
        <li class="item" v-for="(item,index) in list" :key="index">
          <div class="index" v-html="index+1"></div>
          <div class="song">
            <div class="name">{{item.name}}</div>
            <div class="album">{{item.ar[0].name}}-{{item.al.name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array
      },
      title: {
        type: String,
        default: ''
      },
      img: {
        type: String,
        default: ''
      }
    },
    methods: {
      back () {
        this.$router.push({
          path: `/findmusic/musiclist`
        })
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
  #listview
    position :absolute
    width:100%
    top:0px
    bottom:0px
    left:0px
    background :#FFF
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
    background :rgba(255, 255, 255, 0)
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
      margin-top:-70%
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
      .album
        color:#7b7b7b
</style>
