<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
   
    <home-swiper :banners='banners'></home-swiper>
    <home-recommend :recommends='recommends'></home-recommend>
    <home-popular></home-popular>
    <tab-control 
                 :title='tabContrlTitle'
                 @tabControlClick = 'tabControlClick'>
    </tab-control>
    <goods-list :goodsList="goods[currentTabControlType].list"></goods-list>


  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goodslist/GoodsList'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomePopular,
      TabControl,
      GoodsList
    },
    data(){
      return {
        banners:[],
        recommends:[],
        tabContrlTitle:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentTabControlType:'pop',
        currentTabControlIndex:1
      }
    },
    created(){
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list //获取轮播图数据
        this.recommends = res.data.data.recommend.list //获取推荐数据
      });
      getHomeGoods('pop',1).then(res => {
        this.goods['pop'].list = res.data.data.list
      })
      getHomeGoods('new',1).then(res => {
        this.goods['new'].list = res.data.data.list
      })
      getHomeGoods('sell',1).then(res => {
        this.goods['sell'].list = res.data.data.list
      })
    },
    methods:{
      tabControlClick(index){
        this.currentTabBarIndex = index
        switch (index){
          case 0:
            this.currentTabControlType = 'pop';
            break;
          case 1:
            this.currentTabControlType = 'new';
            break;
          case 2:
            this.currentTabControlType = 'sell'
            break
        }
      }
        
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
