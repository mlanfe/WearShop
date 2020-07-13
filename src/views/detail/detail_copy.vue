<template>
  <div id = 'detail'>
    <scroll class="content" ref="scroll">
      <detail-base-info :goods = 'goods'/>
      <detail-shop-info :shop = 'shop'/>
      <detail-goods-info :detail-info = 'detailInfo' @imageLoad = 'imageLoad'/>
      <detail-param-info :param-info = 'paramInfo' ref='params'/>
      <detail-comment-info :comment-info = 'commentInfo' ref="comment"/>
      <goods-list :goods = 'recommends' ref="recommends"/>
    </scroll>
    <back-top @click.native='backClick' v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart='addToCart'/>
  </div>
</template>

<script>
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'

  import {mapActions} from 'vuex'


  export default {
    name: 'Detail',

    data(){
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
      }
    },

    components:{
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
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid获取详情页的数据
      getDetail(this.iid).then(res => {
        //1. 获取顶部轮播图的图片数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
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
      }),
      //3.请求详情页中推荐商品的数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },

    destroyed(){
      this.$bus.$off('itemImgload', this.itemImgListener)
    },

    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        //解决页面无法滚动的bug
        this.$refs.scroll.refresh()
        //获取详情页各主题的位置,并将其存于数组中
        this.themeTopYs = []    // 避免重复调用时,themeTopYs多次赋值
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      //点击顶部导航栏,跳到页面相应位置
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
      },
      //获取滚动位置
      getScrollPosition(postion){
        let positionY = -postion.y
        //1.根据滚动位置,判断是否显示回到顶部按钮
        if(positionY>1000){
          this.isShowBackTop = true
        }else{
          this.isShowBackTop = false
        }
        //2.根据滚动位置,改变顶部导航栏对应标题的颜色
            //将this.themeTopYs.length存储到length中,避免在循环中频繁计算数组的长度
        let length = this.themeTopYs.length
            // i<length-1:避免最后一次循环判断positionY >= Number.MAX_VALUE
        for(let i=0; i<length-1; i++){
            //首先对(this.$refs.navBar.currentIndex !== i)进行判断,以避免对 this.$refs.navBar.currentIndex频繁赋值
          if((this.$refs.navBar.currentIndex !== i) && (positionY < this.themeTopYs[i+1])&&(positionY >= this.themeTopYs[i])){
            this.$refs.navBar.currentIndex = i
          }
        }
      },
      //监听加入购物车的点击事件
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {};
        product.img = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车
        // 方法一: 用mapActions辅助函数
        this.addCart(product).then(res => this.$toast.showMessage(res))
        // 方法二: 直接通过this.$store.dispatch,不使用mapActions辅助函数
        // this.$store.dispatch('addCart', product).then(res => console.log(res))
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom:  58px;
    left: 0;
    right: 0;
  }
</style>
