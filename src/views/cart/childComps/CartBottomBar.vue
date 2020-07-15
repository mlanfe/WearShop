<template>
  <div class="bottom-bar">
    <div class='check-content'>
      <check-button class='check-btn' :isChecked='isAllChecked' @click.native='selectAll'/>
      <span>全选</span>
    </div>
    <div class="sum-price">合计: ￥{{sumPrice.toFixed(2)}}</div>
    <div class="check-out">结算({{goodsAmount}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {mapState} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components:{
      CheckButton
    },
    computed: {
      ...mapState(['cartList']),
      sumPrice(){
        return this.cartList.reduce((pre, item) => {
          if(item.checked){
            return pre + (item.price * item.count)
          }else{
            return pre
          }
        }, 0)
      },
      goodsAmount(){
        return this.cartList.reduce((pre, item) => {
          if(item.checked){
            return pre + item.count
          }else{
            return pre
          }
        }, 0)
      },
      isAllChecked(){
        if(this.cartList.length !== 0){
          return this.cartList.every(item => item.checked)
        }else{
          return false
        }
        
      }
    },
    methods:{
      selectAll(){
        if(this.isAllChecked){
          this.cartList.forEach(element => {
            element.checked = false
          })
        }else{
          this.cartList.forEach(element => {
            element.checked = true
          })

        }
        
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    height: 44px;
    box-shadow: 0 0 3px;
  }
  .check-content{
    display: flex;
  }
  .check-content span{
    font-size: 15px;
    line-height: 44px;
  }
  .check-btn{
    margin: 12px 10px auto;
    width: 20px;
    height: 20px;
  }
  .sum-price{
    line-height: 44px;
    margin-left: 20px;
  }
  .check-out{
    background-color: var(--color-tint);
    line-height: 36px;
    text-align: center;
    position: absolute;
    height: 36px;
    right: 15px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width:70px;
    border-radius: 20% 20%;
    color: #fff;
  }

</style>
