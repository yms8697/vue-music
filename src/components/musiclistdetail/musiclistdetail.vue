<template>
  <div id="detail-wrap">
    <Listview></Listview>
  </div>
</template>
<script>
  import Listview from '@/base/listview.vue'
  import { mapGetters } from 'vuex'
  import { getListDetail } from '@/api/getData.js'
  export default {
    computed: {
      ...mapGetters([
        'musiclist'
      ])
    },
    components: {
      Listview
    },
    created () {
      this._getData()
      console.log('kkk')
      console.log(this.musiclist)
    },
    methods: {
      _getData () {
        getListDetail(this.musiclist.id).then((res) => {
         // console.log(res)
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
</style>
