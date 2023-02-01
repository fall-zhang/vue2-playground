import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../pages/MainView.vue'
import pageRoutes from './pageRoutes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      children: pageRoutes
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/AboutView.vue')
    },
    {
      path: '/',
      name: 'redirect',
      redirect: '/linktop2'
    }
  ]
})

export default router
