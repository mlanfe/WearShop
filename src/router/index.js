import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/Home')
const Category = () => import('views/Category')
const Cart = () => import('views/Cart')
const Profile = () => import('views/Profile')

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router =  new VueRouter({
  routes,
  mode: "history"
})

export default router