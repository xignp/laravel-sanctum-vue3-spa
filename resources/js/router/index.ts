import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Top from '../pages/Top.vue'
import NotFound from '../NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'top',
    component: Top,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundError',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {})

export default router
