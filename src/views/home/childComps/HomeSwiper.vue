<template>
  <swiper>
     <swiper-item v-for='(item,key) in banners' :key='key'>
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: 'HomeSwiper',
    data(){
      return {
        isImgLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    components: {
      Swiper, 
      SwiperItem
    },
    methods: {
      imgload(){
        if(!this.isImgLoad){
          this.$emit('swiperLoad');
          this.isImgLoad = !this.isImgLoad
        }
      },
    }
   
  }
</script>

<style scoped>

</style>
