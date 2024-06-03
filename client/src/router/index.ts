import { createRouter, createWebHistory } from 'vue-router'

import PodsIndex from '@/views/pods/Index.vue'
import HomeView from '@/views/Home.vue'
import PlotsIndex from '@/views/plots/Index.vue'
import ReportsIndex from '@/views/reports/Index.vue'
import SettingsIndex from '@/views/settings/Index.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'Home Page',
    },
  },
  {
    path: '/pods',
    component: PodsIndex,
  },
  {
    path: '/plots',
    component: PlotsIndex,
  },
  {
    path: '/reports',
    component: ReportsIndex,
  },
  {
    path: '/settings',
    component: SettingsIndex,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
