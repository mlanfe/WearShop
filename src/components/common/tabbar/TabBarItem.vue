<template>
  <div class="tab-bar-item" @click="changeRoute">
    <div class="img" v-show="!isActive"><slot name="img"></slot></div>
    <div class="img" v-show="isActive"><slot name="active-img"></slot></div>
    <div class="txt" :class="{active: isActive}"><slot name="txt"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    data(){
      return {
      }
    },
    props:{
      path:{
        type:String
      }
    },
    computed:{
      isActive(){
        return (this.$route.path.indexOf(this.path) !== -1) ? true : false
      }
    },
    methods:{
      changeRoute(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
  }
  .tab-bar-item img{
    width: 26px;
    height: 26px;
    vertical-align: middle;

    margin-top: 3px;

  }
  .tab-bar-item .active{
    color: #ff5777;
  }
</style>
