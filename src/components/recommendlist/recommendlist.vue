<template>
  <div id="recommendlist">
    <slot></slot>
    <ul class="list">
      <li class="list-item" v-for="(item,index) in (list.length>6?list.slice(0,6):list)" :key="index">
        <div class="card" @click.stop="goto(item)">
          <div class="card-img" ref="cardImg">
            <span class="headphone" v-show="item.playCount">
              <Icon type="headphone"></Icon>
              <span class="text">{{item.playCount}}</span>
            </span>
            <img  v-lazy="item.picUrl"></img>
          </div>
          <div class="card-text">{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      list: {
        type: Array
      }
    },
    methods: {
      goto (item) {
        console.log(item)
        let musicList = {
          coverImgUrl: item.picUrl,
          name: item.name,
          id: item.id
        }
        this.$router.push({
          path: 'recommend/detail'
        })
        this.setMusicList(musicList)
      },
      ...mapMutations({
        setMusicList: 'SET_MUSICLIST'
      })
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .list
    display :flex
    flex-direction: row
    justify-content: space-between
    flex-flow: row wrap
    list-style: none
    .list-item
      flex:0 0 32%
      .card-img
        width:100%
        position :relative
        img
          width:100%
          height:100%
        .headphone
          position :absolute
          font-size :10px
          top:0px
          right:15px
          color:rgba(255,255,255,0.9)
          .text
            margin-left :4px
      .card-text
        padding :0 10px 10px 10px
        width:100%
        
</style>
