import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/WelcomeView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/vscode-tutorial',
    name: 'VSCodeTutorial',
    component: () => import('@/views/VSCodeTutorialView.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/GameView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchView.vue')
  },
  {
    path: '/cheatsheet',
    name: 'Cheatsheet',
    component: () => import('@/views/CheatsheetView.vue')
  },
  {
    path: '/reference',
    name: 'Reference',
    component: () => import('@/views/ReferenceView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
