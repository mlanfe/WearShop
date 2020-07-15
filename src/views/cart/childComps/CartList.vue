<template>
  <div class="cart-list">
    <scroll class="content" ref='scroll' >
      <cart-list-item v-for="(item,index) in cartList" :item-info=item :key='index'/>
    </scroll>

  </div>
</template>

<script>
  import cartListItem from './cartListItem'
  import Scroll from 'components/common/scroll/Scroll'
  import {mapState} from 'vuex'

  export default {
    name: 'CartList',
    data(){
      return {
      }
    },
    components:{
      Scroll,
      cartListItem
    },
    computed: {
      //将store的getter属性映射到局部计算属性中
      ...mapState(['cartList'])
    },
    // //解决加入购物车后,购物车页面无法滚动的问题(老师出现不能滚动的bug,但是此代码好像没有问题)
    activated(){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    background-color: #fff;
    box-shadow: 0 0 1px;
  }
  .content{
    height: calc(100vh - 137px);
    overflow: hidden;
  }

</style>
