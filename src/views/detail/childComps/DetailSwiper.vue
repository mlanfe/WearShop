<template>
 <swiper class='detail-swiper'>
   <swiper-item v-for="item in imgList" :key='item'>
     <img :src="item" alt="">
   </swiper-item>
 </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  
  export default {
    name: 'DetailSwiper',
    components: {
      Swiper, 
      SwiperItem
    },
    props:{
      imgList: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
