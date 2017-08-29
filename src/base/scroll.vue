<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapMutations} from 'vuex'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      maxY: {
        type: Number
      }
    },
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          this._initScroll()
        }, 50)
      })
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        this.scroll.on('scroll', (pos) => {
          let scrollY = Math.abs(Math.round(pos.y))
          if (scrollY >= this.maxY) {
            if (this.$store.state.bgstyle === false) {
              return
            }
            this.setBgStyle(false)
          } else {
            if (this.$store.state.bgstyle === true) {
              return
            }
            this.setBgStyle(true)
          }
        })
        this.scroll.on('scrollEnd', (pos) => {
          let scrollY = Math.abs(Math.round(pos.y))
          if (scrollY >= this.maxY) {
            if (this.$store.state.bgstyle === false) {
              return
            }
            this.setBgStyle(false)
          } else {
            if (this.$store.state.bgstyle === true) {
              return
            }
            this.setBgStyle(true)
          }
        })
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      ...mapMutations({
        setBgStyle: 'SET_BGSTYLE'
      })
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 50)
      }
    }
  }
</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>
