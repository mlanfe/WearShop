<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll:null,
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      scrollTO(y,time){
        this.scroll.scrollTo(0,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      },
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      this.scroll.on("scroll", (positon) => {
        this.$emit('scroll',positon.y)
      }),
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>
