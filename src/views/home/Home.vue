<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
   
    <home-swiper :banners='banners'></home-swiper>
    <home-recommend :recommends='recommends'></home-recommend>
    <home-popular></home-popular>

    <ul>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
      <li>xiangmu</li>
    </ul>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomePopular
    },
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    created(){
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list //获取轮播图数据
        this.recommends = res.data.data.recommend.list //获取推荐数据
      })
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9;

  }
</style>
