<template>
 
  <div id="app">
    <Vheader></Vheader>
    <i></i>
    <router-view></router-view>
  </div>
</template>
<script>
  import Vheader from '@/components/header/header.vue'
  export default {
    components: {
      Vheader
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' >
</style>
