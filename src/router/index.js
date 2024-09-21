import { createRouter, createWebHashHistory } from 'vue-router'

import authRouter from '@/modules/auth/router'
import isAuthenticatedGuard from '@/modules/auth/guards/auth-guard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "pokemon" */ '@/modules/pokemon/views/PokemonView.vue'),
    beforeEnter: [ isAuthenticatedGuard ]
  },
  {
    path: '/auth',
    ...authRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
