import {debounce} from './utils.js'
import BackTop from 'components/content/backtop/BackTop'


export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100)  
    //对监听的事件进行保存,以便对其取消监听
    this.itemImgListener =  () => {refresh()}
    this.$bus.$on('itemImgload', this.itemImgListener)
  } 
}

export const backTopMixin = {
  data(){
    return{
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods: {
     //返回顶部按钮发生点击的事件处理程序
     backClick(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
  },
}