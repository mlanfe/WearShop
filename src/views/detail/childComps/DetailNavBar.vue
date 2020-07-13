<template>
    <nav-bar id='detailNavBar' class="detail-nav-bar">
      <div slot="left"><img src="~assets/img/common/back.svg" alt="" @click="backClick"></div>
      <div slot="middle" class="title-list">
        <div v-for="(item, index) in titleList" 
             :key="item"
             class="title-item"
             @click="titleClick(index)"
             :class="{active:index==currentTitleIndex }"
             >
          <span>{{item}}</span>
        </div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    data(){
      return {
        titleList: ['商品','参数','评论','推荐'],
        currentTitleIndex: 0,
        isActive: false
      }
    },
    methods: {
      titleClick(index){
        this.currentTitleIndex = index
      },
      backClick(){
        this.$router.go(-1)
      }
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  #detailNavBar{
    background-color: #fff;
    color: var(--color-text);
    font-size: 15px;
  }
  #detailNavBar img{
    position: relative;
    bottom: -6px;
  }
  .title-list{
    display: flex;

  }
  .title-list .title-item{
    flex: 1
  }
  .active span{
    color: var(--color-high-text);
  }
</style>

