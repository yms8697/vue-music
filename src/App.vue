<template>
 
  <div id="app">
    <Vheader></Vheader>
    <keep-alive><router-view></router-view></keep-alive>
    <Play></Play>
  </div>
</template>
<script>
  import Vheader from '@/components/header/header.vue'
  import Play from '@/components/play/play.vue'
  export default {
    components: {
      Vheader,
      Play
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' >
</style>
