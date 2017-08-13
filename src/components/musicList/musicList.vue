<template>
  <div id="musiclist">
    <div class="highquality-playlist"></div>
    <div class="playlist-select"></div>
    <ul class="playlist">
      <li class="playlist-item" v-for="(item,index) in playlist" :key="index">
        <div class="card">
          <div class="card-img">
            <span class="headphone"><Icon type="headphone"></Icon><span class="text">{{item.playCount}}</span></span>
            <span class="person"><Icon type="person"></Icon></span>
            <img :src="item.coverImgUrl"></img>
          </div>
          <div class="card-text">
            <h5>{{item.name}}</h5>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { getPlaylist } from '@/api/getData.js'
  const ERR_OK = 200
  export default {
    data () {
      return {
        playlist: []
      }
    },
    created () {
      this._getplaylist()
    },
    methods: {
      _getplaylist () {
        getPlaylist().then((res) => {
          if (res.data.code === ERR_OK) {
            console.log(res.data.playlists)
            this.playlist = res.data.playlists
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .highquality-playlist
    width:100%
    height:100px
    background :#777
  .playlist-select
    width:100%
    height:30px
  .playlist
    display :flex
    flex-direction: row
    justify-content: space-between
    flex-flow: row wrap
    list-style: none
    .playlist-item
      flex:0 0 49%
      .card-img
        width:100%
        position :relative
        .headphone
          display :inline-block
          position :absolute
          font-size :10px
          top:0px
          right:15px
          color:rgba(255,255,255,0.9)
          .text
            margin-left :4px
        .person
          display :inline-block
          position :absolute
          left:5px
          bottom:8px
          color :#fff
        img
          width:100%
          height:100%
      .card-text
        width:100%
        height:50px
        padding :0 10px 0 10px

</style>
