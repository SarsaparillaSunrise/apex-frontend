import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/logs/:channel',
      name: 'channel',
      component: () => import('../views/ChannelView.vue'),
    },
    {
      path: '/logs/:channel/:date',
      name: 'log',
      component: () => import('../views/LogView.vue'),
    },
  ],
})

export default router
