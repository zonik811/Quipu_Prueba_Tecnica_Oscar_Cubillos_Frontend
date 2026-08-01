import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin } from '../api/auth'
import { isTokenValid } from '../utils/token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(getStoredToken())
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const loading = ref(false)
  const error = ref('')

  function getStoredToken() {
    const t = localStorage.getItem('token')
    return t && isTokenValid(t) ? t : ''
  }

  function persist(tokenValue, userValue) {
    if (tokenValue) localStorage.setItem('token', tokenValue)
    if (userValue) localStorage.setItem('user', JSON.stringify(userValue))
  }

  async function doLogin(username, password) {
    loading.value = true
    error.value = ''
    try {
      const response = await apiLogin(username, password)
      token.value = response.data.token
      user.value = response.data.user || { username }
      persist(token.value, user.value)
      return true
    } catch (err) {
      error.value = 'Credenciales inválidas'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, loading, error, doLogin, logout }
})
