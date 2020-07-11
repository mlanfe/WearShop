<template>
  <div class="home-recommend">
    <div v-for='(item,index) in recommends' :key='index' class="home-recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend',
    props:{
      recommends:{
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .home-recommend{
    display: flex;
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    border-bottom: 10px solid #eee;
  }
  .home-recommend-item{
    flex: 1;
  }
  .home-recommend-item img{
    width: 80px;
    height: 80px;
  }
  .home-recommend-item span{
    display: block;
    margin:5px 0 15px;

  }
</style>
