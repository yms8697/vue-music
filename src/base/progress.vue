<template>
  <div id="progress">
    <div class="bar-inner" ref="progressBar">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="btn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
  const BUTTON = 12
  export default {
    props: {
      percent: {
        type: Number
      }
    },
    watch: {
      percent (newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          let barWidth = this.$refs.progressBar.clientWidth - BUTTON
          let offSet = newPercent * barWidth
          this._offset(offSet)
        }
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      progressTouchStart (e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        let deltaX = e.touches[0].pageX - this.touch.startX
        let offSet = Math.min(Math.max(0, this.touch.left + deltaX), (this.$refs.progressBar.clientWidth - BUTTON))
        this._offset(offSet)
      },
      progressTouchEnd () {
        this.touch.initiated = false
        this._trigger()
      },
      _trigger () {
        let barWidth = this.$refs.progressBar.clientWidth - BUTTON
        let progress = this.$refs.progress.clientWidth
        let percent = progress / barWidth
        this.$emit('percentChange', percent)
      },
      _offset (offSet) {
        this.$refs.progress.style.width = `${offSet}px`
        this.$refs.btn.style.transform = `translate3d(${offSet}px,0,0)`
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  #progress
    height:30px
    flex:8
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      border-radius: 3px      
      .progress
        height:100%
        width:0px
        background :red
        border-radius: 3px    
      .progress-btn-wrapper
        position: absolute
        left: -10px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 9px
          left: 9px
          box-sizing: border-box
          width: 12px
          height: 12px
          border-radius: 50%
          background: #fff
</style>