<template>
  <div class="check_btn" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props:{
      isChecked:{
        type: Boolean,
        default(){
          return false
        }
      }
    },
  }
</script>

<style scoped>
  .check_btn{
    background-color: #fff;
    border: solid 2px #dbd3d3;
    border-radius: 50%;
  }
  .checked{
    background-color: var(--color-tint);
    border: solid 2px var(--color-tint);
  }

</style>
