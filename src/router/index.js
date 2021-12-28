import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { // 添加房产首页
    path:'/fang',
    name:'fang',
    component: ()=>import('@/views/fang/Fang.vue')
  },
  {
    path:'/addFang',
    name:'addFang',
    component: ()=>import('@/views/fang/addFang.vue')
  },
  {
    path:'/searchfang',
    name:'searchfang',
    component: ()=>import('@/views/fang/search.vue')
  },
  {
    path:'/addAddress',
    name:'addAddress',
    component: ()=>import('@/views/fang/addAddress.vue')
  },
  {
    path:'/addRoom',
    name:'addRoom',
    component: ()=>import('@/views/fang/addRoom.vue')
  },
  {
    path:'/roomList',
    name:'roomList',
    component: ()=>import('@/views/fang/roomList.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
