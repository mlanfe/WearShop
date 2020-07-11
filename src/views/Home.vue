<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
    主页
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'Home',
    components:{
      NavBar
    }
  }
</script>

<style scoped>

</style>
