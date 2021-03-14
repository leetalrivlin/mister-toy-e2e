import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import toyApp from '../views/toyApp.vue'
import toyDetails from '../views/toyDetails.vue'
import toyEdit from '../views/toyEdit.vue'
import dashboard from '../views/dashboard.vue'
import login from '../views/login.vue'
import signUp from '../views/signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signUp
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/toy',
    name: 'toyApp',
    component: toyApp
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/toy/edit/:toyId?',
    name: 'toyEdit',
    component: toyEdit
  },
  {
    path: '/toy/:toyId',
    name: 'toyDetails',
    component: toyDetails
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
