import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { isTokenValid } from '../utils/token'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    redirect: '/lists'
  },
  {
    path: '/lists',
    name: 'Playlists',
    component: () => import('../views/PlaylistsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lists/create',
    name: 'CreatePlaylist',
    component: () => import('../views/CreatePlaylistView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lists/:listName',
    name: 'PlaylistDetail',
    component: () => import('../views/PlaylistDetailView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const hasValidToken = isTokenValid(token)

  if (!hasValidToken && token) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (to.meta.requiresAuth && !hasValidToken) {
    next('/login')
  } else if (to.name === 'Login' && hasValidToken) {
    next('/lists')
  } else {
    next()
  }
})

export default router
