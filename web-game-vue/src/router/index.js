import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/WelcomeView.vue')
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
    path: '/reference',
    name: 'Reference',
    component: () => import('@/views/ReferenceView.vue')
  },
  {
    path: '/cheatsheet',
    name: 'Cheatsheet',
    component: () => import('@/views/CheatsheetView.vue')
  },
  {
    path: '/commands',
    name: 'Commands',
    component: () => import('@/views/CommandsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
