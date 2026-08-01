<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-spotify-dark to-gray-900">
    <div class="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
      <div class="text-center mb-8">
        <div class="text-5xl mb-3">♪</div>
        <h1 class="text-2xl font-bold text-spotify-dark">Iniciar Sesión</h1>
        <p class="text-gray-400 text-sm mt-1">Accede a tus listas de reproducción</p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="username" class="block mb-1.5 font-semibold text-sm text-gray-600">Usuario</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Ingrese su usuario"
            required
            minlength="3"
            maxlength="50"
            autocomplete="username"
            class="input-field"
          />
        </div>
        <div>
          <label for="password" class="block mb-1.5 font-semibold text-sm text-gray-600">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Ingrese su contraseña"
            required
            minlength="4"
            maxlength="128"
            autocomplete="current-password"
            class="input-field"
          />
        </div>
        <p v-if="auth.error" class="error-text flex items-center gap-1 animate-fade-in">
          <span>⚠</span> {{ auth.error }}
        </p>
        <button type="submit" :disabled="auth.loading" class="btn-primary mt-2">
          <span v-if="auth.loading" class="inline-flex items-center gap-2">
            <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Ingresando...
          </span>
          <span v-else>Ingresar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')

async function handleSubmit() {
  const success = await auth.doLogin(username.value, password.value)
  if (success) {
    router.push('/lists')
  }
}
</script>
