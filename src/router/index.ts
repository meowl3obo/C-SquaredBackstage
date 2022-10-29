import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { home } from './views/Home'
import { product } from './views/Product'

const routes: Array<RouteRecordRaw> = []

routes.push(home, product)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.title) document.title = to.meta.title as string
  next()
})

export default router
