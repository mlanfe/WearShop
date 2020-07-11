<template>
  <div>
    <nav-bar>
      <div slot="middle">购物车</div>
    </nav-bar>
    购物车
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'  
  export default {
    name: 'Cart',
    components:{
      NavBar
    }
  }
</script>

<style scoped>

</style>
