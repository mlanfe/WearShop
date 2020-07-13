<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
    <tab-control 
                :title='tabContrlTitle'
                @tabControlClick = 'tabControlClick'
                ref="tabControl1"
                class="tabcontrol1"
                v-show="isShowTabControl"
                >
    </tab-control>
    <scroll class="content" 
            ref='scroll'
            @scroll='scrollPostion'
            @pullingUp='loadMore'
            :probeType='3'
            :pullUpLoad='true'>
      <home-swiper :banners='banners' @swiperLoad='swiperLoad'></home-swiper>
      <home-recommend :recommends='recommends'></home-recommend>
      <home-popular/>
      <tab-control 
                  :title='tabContrlTitle'
                  @tabControlClick = 'tabControlClick'
                  ref="tabControl">
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
        isShowBackTop: false,
        tabOffsetTop:0,
        isShowTabControl:false,
        positionY: 0

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
    activated(){
      // 必须refresh一下,不然可能出现滚动的问题, 并且要先refresh再做其他与滚动相关的操作
      this.$refs.scroll.refresh()
      this.$refs.scroll. scrollTO(this.positionY, 0)
      
    },
    deactivated() {
      this.positionY = this.$refs.scroll.getPostionY()
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
        };
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      tabTop(){
        this.$refs.scroll.scrollTO(0,1000)
      },
      scrollPostion(position){
        this.isShowBackTop = (-position) > 1000
        this.isShowTabControl = (-position) > (this.tabOffsetTop-44)
      },
      loadMore(){
        this.getHomeGoods(this.currentTabControlType)
      },
      swiperLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
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
  .tabcontrol1{
    position: fixed;
    top: 44px;
    right: 0;
    left: 0;
    z-index: 29;
    background-color: #fff;
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
