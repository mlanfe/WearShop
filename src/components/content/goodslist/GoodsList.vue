<template>
    <div class="goods-list">
      <div class="goods-list-item" v-for='(item,index) in goodsList' :key='index'>
        <img :src="item.show.img" alt="">
        <div class="info">
          <span class="good-title">{{item.title}}</span>
          <span class="price">{{item.price}}</span>
          <span class="collect">{{item.cfav}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'GoodsList',
    props:{
      goodsList:{
        type: Array,
        default: [],
      }
    }
  }
</script>

<style scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .goods-list-item {
    text-align: center;
    width: 48%;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .goods-list-item img{
    width: 100%;
    border-radius: 5px;
    margin-bottom: 5px;
  }
 
  .goods-list-item .good-title{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .goods-list-item .price{
    color: var(--color-tint);
    margin-right: 5px;
  }
  .goods-list-item .collect::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -2px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
