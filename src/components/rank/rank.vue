<template>
  <div id="rank">
    <list-title>
      <h3 class="title">官方榜</h3>
    </list-title>
  </div>
</template>
<script>
  import listTitle from '@/base/listTitle'
  import {getRank} from '@/api/getData'
  import {ERR_OK} from '@/common/js/config'
  export default {
    components: {
      listTitle
    },
    created () {
      this.getRankData('3')
      this.getRankData('0')
      this.getRankData('2')
      this.getRankData('1')
    },
    data () {
      return {
        list: []
      }
    },
    methods: {
      getRankData (idx) {
        getRank(idx).then((res) => {
          if (res.status === ERR_OK) {
            let data = res.data.result
            this.list.push(data)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
</style>
