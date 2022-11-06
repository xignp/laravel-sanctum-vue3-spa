import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Top from '../pages/Top.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import NotFound from '../NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Top',
    component: Top,
    meta: { onlyAuth: false, onlyGuest: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { onlyAuth: false, onlyGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { onlyAuth: false, onlyGuest: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { onlyAuth: true, onlyGuest: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { onlyAuth: false, onlyGuest: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const onlyAuth = to.matched.some((record) => record.meta.onlyAuth)
  const onlyGuest = to.matched.some((record) => record.meta.onlyGuest)
  const isAuth = store.getAuth

  if (isAuth) {
    if (onlyGuest) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    if (onlyAuth) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

export default router
