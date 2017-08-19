<template>
  <div id="detail-wrap">
    <Listview :list="detailList" :img="bgImg" :title="title">
    </Listview>
  </div>
</template>
<script>
  import Listview from '@/base/listview.vue'
  // import { mapGetters } from 'vuex'
  import { getListDetail } from '@/api/getData.js'
  export default {
    data () {
      return {
        detailList: []
      }
    },
    computed: {
      musiclist () {
        return this.$store.state.musiclist
      },
      bgImg () {
        if (this.musiclist) {
          return this.musiclist.coverImgUrl
        }
      },
      title () {
        if (this.musiclist) {
          return this.musiclist.name
        }
      }
    },
    components: {
      Listview
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
      _getData () {
        getListDetail(this.musiclist.id).then((res) => {
          this.detailList = res.data.playlist.tracks
          console.log(res.data.playlist.tracks)
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
</style>
