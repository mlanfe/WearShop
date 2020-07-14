<template>
  <div id="detail">
    <detail-nav-bar ref="navBar" @titleClick='titleClick'/>
    <scroll class="content" 
            ref="scroll" 
            @scroll='getPositionY'
            :probeType='3'
            :pullUpLoad="true">
      <detail-swiper :imgList='swiperData'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad = 'imageLoad'/>
      <detail-param-info :param-info='paramInfo' ref='params'/>
      <detail-comment-info :comment-info='commentInfo' ref="comment"/>
      <goods-list :goodsList='recommends' ref="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goodslist/GoodsList'

  import {getDetailMultidata, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {itemListenerMixin} from 'common/mixin'
  



  export default {
    name: 'Detail',
    data(){
      return {
        itemId: '',
        swiperData: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll
    },
    mixins:[itemListenerMixin],
    created(){
      this.itemId = this.$route.query.id
      getDetailMultidata(this.itemId).then(res => {
        const data = res.data.result
        this.swiperData = data.itemInfo.topImages
        //2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3. 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //4. 保存商品的详情数据
        this.detailInfo = data.detailInfo
        //5. 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6. 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      //3.请求详情页中推荐商品的数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
      
    },
    methods: {
      titleClick(index){
        this.currentIndex = index
        this.$refs.scroll.scrollTO(-this.themeTopYs[index],200)
      },
      imageLoad(){
        //解决页面无法滚动的bug
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      },
      getPositionY(position){
        let positionY = -position
        let length = this.themeTopYs.length
        for(let i=0; i < length-1; i++){
          if((this.$refs.navBar.currentTitleIndex !== i) && (positionY < this.themeTopYs[i+1]) && (positionY >= this.themeTopYs[i]) ){
            this.$refs.navBar.currentTitleIndex = i
          }
        }
      },
      
    },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    background-color: #fff;
  }
  .content{
    overflow: hidden;
    height: calc(100vh - 93px);
  }
</style>
