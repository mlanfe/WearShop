<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :imgList='swiperData'/>
    {{itemId}}
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import {getDetailMultidata} from 'network/detail'

  export default {
    name: 'Detail',
    data(){
      return {
        itemId: '',
        swiperData: [],
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper
    },
    created(){
      this.itemId = this.$route.query.id
      getDetailMultidata(this.itemId).then(res => {
        const data = res.data.result
        this.swiperData = data.itemInfo.topImages
      })
      
    },
    methods: {
    },
  }
</script>

<style scoped>
  
</style>
