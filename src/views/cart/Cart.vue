<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="middle">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'  
  import CartBottomBar from './childComps/CartBottomBar'
  import CartList from './childComps/CartList'
  
  export default {
    name: 'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar
    }
  }
</script>

<style scoped>
  .nav-bar{
    font-size: 16px;
  }
</style>
