<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
  }
</script>

<style scoped>
  .tab-bar{
    position: fixed;

    display: flex;
    bottom: 0;
    right: 0;
    left: 0;

    text-align:center;
    height: 49px;

    border-top: 1px solid #eee;
    background-color: #f6f6f6;
    box-shadow: 0px -1px 1px rgba(150,150,150,.08);


  }
</style>
