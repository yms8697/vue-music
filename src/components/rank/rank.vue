<template>
  <Scroll id="rank" ref="rank" :data="list">
    <div>
      <list-title>
        <h3 class="title">官方榜</h3>
      </list-title>
      <ul class="list">
        <li class="item" v-for="(item, index) in list" :key="index">
          <div class="wrapper">
            <div class="img-container">
              <img v-lazy="item.coverImgUrl">
            </div>
            <div class="dec">
              <span class="text" v-for="(item, key) in list[index].tracks.slice(0,3)" :key="key">
                {{key+1}}.{{item.name}}-{{item.artists[0].name}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </Scroll>
</template>
<script>
  import listTitle from '@/base/listTitle'
  import {getRank} from '@/api/getData'
  import {ERR_OK} from '@/common/js/config'
  import Scroll from '@/base/scroll'
  import {playlistMixin} from '@/common/js/mixin'
  export default {
    mixins: [playlistMixin],
    components: {
      listTitle,
      Scroll
    },
    created () {
      this.getRankData('0')
      this.getRankData('1')
      this.getRankData('2')
      this.getRankData('3')
      this.getRankData('4')
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      // 当mimiplay存在时将list的bottom设成60px,防止miniplay遮挡
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.$el.style.bottom = bottom
        this.$refs.rank.refresh()
      },
      getRankData (idx) {
        getRank(idx).then((res) => {
          if (res.status === ERR_OK) {
            let data = res.data.result
            console.log(data)
            this.list.push(data)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  #rank
    position :fixed
    width :100%
    top:85px
    bottom:0px
    overflow :hidden
  .item
    .wrapper
      display:flex
      width:100%
      height:140px
      padding-top :5px
      .img-container
        flex: 135px 0 0
        img
          width:100%
      .dec
        flex:1
        display :flex
        flex-direction:column
        justify-content:space-around
        padding :10px
        border-bottom:1px solid #d2cccc
        font-size:12px
        .text
          width:90%
          max-width:180px
          text-overflow:ellipsis
          overflow :hidden
          white-space: nowrap
</style>
