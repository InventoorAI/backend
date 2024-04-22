import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/Home.vue'
import AboutView from '@/pages/About.vue'
import DrawersIndexView from '@/pages/drawers/Index.vue'
import ReviewView from '@/pages/Review/Index.vue'
import CardsIndexView from '@/pages/cards/Index.vue'
import ReportsIndexView from '@/pages/reports/Index.vue'
import NotFoundView from '@/pages/404.vue'


const routes = [
  { path: '/', component: HomeView, title: 'Home' },
  { path: '/about', component: AboutView, title: 'About' },
  { path: '/drawers', component: DrawersIndexView, title: 'Drawers' },
  { path: '/review', component: ReviewView, title: 'Review' },
  { path: '/cards', component: CardsIndexView, title: 'Cards' },
  { path: '/reports', component: ReportsIndexView, title: 'Reports' },

  { path: '/:pathMatch(.*)*', component: NotFoundView, title: 'Not Found' }
  // { path: '/:pathMatch(.*)*', redirect: '/' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
