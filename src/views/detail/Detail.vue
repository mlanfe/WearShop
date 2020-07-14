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
    <back-top @click.native="tabTop" v-show="isShowBackTop" />
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"/>
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
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'
  import GoodsList from 'components/content/goodslist/GoodsList'

  import {getDetailMultidata, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  



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
      DetailBottomBar,
      Scroll
    },
    mixins:[itemListenerMixin, backTopMixin],
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
      },
      getPositionY(position){
        let positionY = -position
        this.isShowBackTop = (positionY) > 1000
        let length = this.themeTopYs.length
        for(let i=0; i < length-1; i++){
          if((this.$refs.navBar.currentTitleIndex !== i) && (positionY < this.themeTopYs[i+1]) && (positionY >= this.themeTopYs[i]) ){
            this.$refs.navBar.currentTitleIndex = i
          }
        }
      },
      //监听加入购物车的点击事件
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.img = this.swiperData[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.itemId;
        // //2.将商品添加到购物车
        // // 方法一: 用mapActions辅助函数
        // this.addCart(product).then(res => this.$toast.showMessage(res))
        // 方法二: 直接通过this.$store.dispatch,不使用mapActions辅助函数
        // this.$store.dispatch('addCart', product).then(res => console.log(res))
        this.$store.dispatch('addToCart', product)
        console.log(product);
      }
      
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
  .bottom-bar{
    position: relative;
    z-index: 39;
  }
</style>
