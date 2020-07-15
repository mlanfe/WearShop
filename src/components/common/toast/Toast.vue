<template>
  <div v-show="isShow" class="toast">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods:{
      showMessage(msg, duration = 2000){
        this.message = msg
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    width: 150px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    border-radius: 5px;
  }
</style>
