<template>
    <div class="title">
      <div class='title-item' 
           v-for='(item,index) in title' 
           :key='item'
           :class="{active: index === currentIndex}"
           @click="changeStatus(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'TabControl',
    data(){
      return {
        isactive: false,
        currentIndex: 1
      }
    },
    props:{
      title:{
        type: Array,
        default: [],
      },
    },
    methods:{
      changeStatus(index){
        this.currentIndex = index;
        this.$emit('tabControlClick',index)
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    vertical-align: middle;
  }
  .title-item{
    flex: 1;
  }
  .title-item span{
    width: 40px;
    padding: 5px;
  }
  .active span{
    border-bottom: 1px solid var(--color-tint);
  }
</style>
