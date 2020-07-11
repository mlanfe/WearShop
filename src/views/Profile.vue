<template>
  <div>
    <nav-bar>
      <div slot="middle">我的</div>
    </nav-bar>
    我的
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Profile',
    components:{
      NavBar
    }
  }
</script>

<style scoped>

</style>
