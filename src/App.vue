<template>
 
  <div id="app">
    <Vheader></Vheader>
    <keep-alive><router-view></router-view></keep-alive>
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
