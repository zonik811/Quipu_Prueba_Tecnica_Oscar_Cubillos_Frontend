<template>
  <div id="app-layout" class="min-h-screen bg-gray-100">
    <Navbar v-if="$route.name !== 'Login'" @logout="handleLogout" />
    <main class="max-w-4xl mx-auto my-8 px-4">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <ToastContainer :toasts="toast.toasts" @remove="toast.remove" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useToast } from './composables/useToast'
import Navbar from './components/Navbar.vue'
import ToastContainer from './components/ToastContainer.vue'

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style>
.page-enter-active {
  animation: fade-in 0.3s ease-out;
}
.page-leave-active {
  animation: fade-in 0.15s ease-in reverse;
}
</style>
