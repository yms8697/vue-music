<template>
  <div id="detail-wrap">
    <Listview></Listview>
  </div>
</template>
<script>
  import Listview from '@/base/listview.vue'
  import { mapGetters } from 'vuex'
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
      console.log(this.musiclist)
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
</style>
