// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files


import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import searchTravel from "@/components/searchTravel.vue"
import searchPrice from "@/components/searchPrice.vue"
import createOrder from "@/components/createOrder.vue"
import Intro from "@/components/intro.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Intro
    }
    ,{
      path: '/foo',
      name: 'foo',
      component: searchTravel
    },
    {
      path: '/bar',
      name: 'bar',
      component: searchPrice
    },
    {
      path: '/let',
      name: 'let',
      component: createOrder
    }
  ]
})