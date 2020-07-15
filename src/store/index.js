import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  getters:{
    cartListlength(state){
      return state.cartList.length
    }
  },
  mutations:{
    addGoods(state, payLoad){
      state.cartList.push(payLoad)
     

    },
    addCount(state, payLoad){
      payLoad.count += 1
    }
  },
  actions:{
    addToCart(context, payLoad){
      new Promise((resolve,reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid == payLoad.iid)
        if(oldProduct){
          context.commit('addCount', oldProduct)
          resolve()
        }else{
          payLoad.count = 1
          payLoad.checked = false
          context.commit('addGoods', payLoad)
          resolve()
        }
      })
      
    }
  }
})

export default store