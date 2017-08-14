<template>
  <div id="recommendlist">
    <h3 class="title">{{recommendtitle}}</h3>
    <ul class="list">
      <li class="list-item" v-for="(item,index) in list" :key="index">
        <div class="card">
          <div class="card-img">
            <span class="headphone" v-show="item.playCount">
              <Icon type="headphone"></Icon>
              <span class="text">{{item.playCount}}</span>
            </span>
            <img :src="item.picUrl"></img>
          </div>
          <div class="card-text">{{item.name}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      recommendtitle: {
        type: String
      },
      list: {
        type: Array
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .title
    border-left :2px solid #c62f2f
    padding-left :5px
    margin-top :20px
    margin-bottom :10px
    font-size :14px
    line-height :14px
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
