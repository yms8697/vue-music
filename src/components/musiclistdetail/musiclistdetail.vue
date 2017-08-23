<template>
  <div id="detail-wrap">
    <div  class="list-title">
      <span @click="back"><Icon type="chevron-left"></Icon></span>
    </div>
    <Scroll :data="list" class="wrap-content">
      <div>
        <Listview @select="selectItem" :title="title" :img='bgImg' :list='detailList'>
          <div @click="detailShow" class="bg-img" >
            <img :src="bgImg">
          </div>
        </Listview>
      </div>
    </Scroll>
    <transition name="slide">
      <div v-show='show' class="dec-detail">
        <div>
          <div class="detail-bg blur " :style='bg'></div>
          <Scroll ref="detail" class="detail-wrapper">
            <div class="detail-main">
              <div class="img-container">
                <img :src="bgImg">
              </div>
              <h1 class="dec-title" v-html="title"></h1>
              <div class="dec" v-html="replace"></div>
              <span> 
                <span>标签:</span>
                <span  class="tag"v-for='(item,index) in this.musiclist.tags' :key="index">
                  <div>{{item}}</div>
                </span>
              </span>
            </div>
          </Scroll>
        </div>
        <div class="close-wrapper">
          <div @click='show=!show' class="close"><Icon type="close-round"></Icon></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Listview from '@/base/listview.vue'
  import Song from '@/common/js/song.js'
  // import { mapGetters } from 'vuex'
  import {mapActions} from 'vuex'
  import { getListDetail, getPlayUrl } from '@/api/getData.js'
  import Scroll from '@/base/scroll.vue'
  export default {
    data () {
      return {
        detailList: [],
        show: false
      }
    },
    computed: {
      list () {
        return this.detailList
      },
      musiclist () {
        return this.$store.state.musiclist
      },
      bgImg () {
        if (this.musiclist) {
          return this.musiclist.coverImgUrl
        }
      },
      // 将字符串中的空格替换成</br>
      replace () {
        let str = this.musiclist.description
        str = str.replace(/\s/g, '</br>')
        return str
      },
      title () {
        if (this.musiclist) {
          return this.musiclist.name
          // this.$emit('select', item, index)
        }
      },
      bg () {
        return `background:url(${this.musiclist.coverImgUrl});background-size:100% 100%`
      }
    },
    components: {
      Listview,
      Scroll
    },
    created () {
      if (!this.musiclist) {
        this.$router.push({
          path: `/findmusic/musiclist`
        })
      } else {
        this._getData()
      }
    },
    methods: {
      selectItem (item, index) {
        this.selectPlay({
          list: this.detailList,
          index: index
        })
      },
      ...mapActions([
        'selectPlay'
      ]),
      // 详情页显示
      detailShow () {
        this.show = true
        // 刷新scroll
        setTimeout(() => {
          this.$refs.detail.refresh()
        }, 20)
      },
      // 返回
      back () {
        this.$router.back()
      },
      // 获取数据
      _getData () {
        getListDetail(this.musiclist.id).then((res) => {
          // this.detailList = res.data.playlist.tracks
          // console.log(res.data.playlist.tracks)
          this.detailList = this.normalizeSongs(res.data.playlist.tracks)
          this.detailList.forEach((item) => {
            getPlayUrl(item.id).then((res) => {
              item.playUrl = res.data.data[0].url
            })
          })
        })
      },
      normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          ret.push(new Song({
            id: item.id,
            name: item.name,
            singer: item.ar[0].name,
            duration: item.dt,
            album: item.al.name,
            imgUrl: item.al.picUrl
          }))
        })
        return ret
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .wrap-content
    position :fixed
    width:100%
    top:0px
    left:0px
    bottom:0px
    overflow :hidden
    background :#fff
  .slide-enter-active, .slide-leave-active
    transition :all 0.3s
  .slide-enter, .slide-leave-to
    transform :translate3d(0,100%,0)
  .dec-detail
    position :fixed
    width:100%
    height:100%
    top:0px
    left:0px
    z-index:99
    overflow :hidden
    background :#fff
    .detail-bg
      width:100%
      height:100%
    .blur
      filter :blur(80px)
    .detail-wrapper
      position :absolute
      width:100%
      top:0px
      bottom:70px
      left:0px
      padding :0 10% 
      overflow :hidden
      color:#fff
      .img-container
        width:100%
        padding :20% 10% 0 10%
        img 
          width:100%
      .dec-title
        font-size :14px
        font-weight:200
        margin :10px 0
        text-align:center
      .tag
        display :inline-block
        margin-left :8px
        border-radius:8px 
        padding :0 5px
        border :1px solid #fff
    .close-wrapper
      position :absolute
      bottom:0px
      width:100%
      height:70px
      .close
        width:70px
        height :70px
        line-height :70px
        text-align :center
        margin :0 auto
        font-size :28px
        color:#fff
      
</style>
