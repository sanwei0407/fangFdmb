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
    path:'/editFang',
    name:'editFang',
    component: ()=>import('@/views/fang/editFang.vue')
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
  },
  {
    path: '/roomInfo',
    name: 'roomInfo',
    component: ()=>import('@/views/fang/roomInfo.vue')
  },
  { // 修改房间信息
    path: '/editRoom',
    name: 'editRoom',
    component: ()=>import('@/views/fang/editRoom.vue')
  },
  { // 添加租客
    path: '/addClient',
    name: 'addClient',
    component: ()=>import('@/views/client/addClient.vue')
  },
  {
    path: '/billList',
    name: 'billList',
    component: ()=>import('@/views/bill/billList.vue')
  },
  {
    path: '/addBill',
    name: 'addBill',
    component: ()=>import('@/views/bill/addBill.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
