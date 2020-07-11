<template>
  <div class="nav-bar">
    <div class="left nav-bar-item">
      <slot name='left'></slot>
    </div>
    <div class="middle nav-bar-item">
      <slot name='middle'></slot>
    </div>
    <div class="right nav-bar-item">
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    background-color: #ff8198;
    text-align:center;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 20px;
    box-shadow: 0px 1px 1px rgba(150,150,150,.08);
  }
  .left{
    flex: 1;
  }
  .right{
    flex: 1;
    
  }
  .middle{
    flex: 3;
  }
</style>
