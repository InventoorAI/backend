import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import DrawerIndexView from '@/views/drawers/Index.vue'
import DeckIndexView from '@/views/decks/Index.vue'
import CardIndexView from '@/views/cards/Index.vue'
import ReviewView from '@/views/review/Index.vue'
import ReportsIndexView from '@/views/reports/Index.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/drawers',
    component: DrawerIndexView,
    meta: {
      title: 'Drawers',
    },
  },
  {
    path: '/decks',
    component: DeckIndexView,
    meta: {
      title: 'Decks',
    },
  },
  {
    path: '/cards',
    component: CardIndexView,
    meta: {
      title: 'Cards',
    },
  },
  {
    path: '/review',
    component: ReviewView,
    meta: {
      title: 'Review',
      hideLayout: true,
    },
  },
  {
    path: '/reports',
    component: ReportsIndexView,
    meta: {
      title: 'Reports',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
