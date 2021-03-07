import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import( /* webpackChunkName: "home" */ '../views/home/Home')
const category = () => import( /* webpackChunkName: "category" */ '../views/category/Category')
const shopcart = () => import( /* webpackChunkName: "shopcart" */ '../views/shopcart/Shopcart')
const profile = () => import( /* webpackChunkName: "profile" */ '../views/profile/Profile')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  component: home
}, {
  path: '/category',
  name: 'category',
  component: category
}, {
  path: '/shopcart',
  name: 'shopcart',
  component: shopcart
}, {
  path: '/profile',
  name: 'profile',
  component: profile
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
