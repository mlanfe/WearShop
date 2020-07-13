<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
    <scroll class="content" 
            ref='scroll'
            @scroll='scrollPostion'
            @pullingUp='loadMore'
            :probeType='3'
            :pullUpLoad='true'>
      <home-swiper :banners='banners'></home-swiper>
      <home-recommend :recommends='recommends'></home-recommend>
      <home-popular/>
      <tab-control 
                  :title='tabContrlTitle'
                  @tabControlClick = 'tabControlClick'>
      </tab-control>
      <goods-list :goodsList="goods[currentTabControlType].list"></goods-list>
    </scroll>
    <back-top @click.native="tabTop" v-show="isShowBackTop" />
    


  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goodslist/GoodsList'
  import BackTop from 'components/content/backtop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomePopular from './childComps/HomePopular'
  
  import {debounce} from 'common/utils'
  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomePopular,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
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
        currentTabControlIndex:1,
        isShowBackTop: false

      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,100) 
      this.$bus.$on('itemImgLoad', refresh)
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
      },
      
      tabTop(){
        this.$refs.scroll.scrollTO(0,1000)
      },
      scrollPostion(position){
        this.isShowBackTop = -position > 1000 ? true : false
      },
      loadMore(){
        this.getHomeGoods(this.currentTabControlType)
      },
      // --------------------------与网络请求相关的方法------------------------------
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list //获取轮播图数据
          this.recommends = res.data.data.recommend.list //获取推荐数据
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
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
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    
  }
</style>
