<template>
  <nav class="bg-spotify-dark text-white px-8 flex items-center justify-between h-14 shadow-lg animate-slide-down">
    <div class="text-xl font-bold tracking-tight">
      <span class="text-spotify">♪</span> Listas de Reproducción
    </div>
    <div class="flex gap-6 items-center">
      <router-link to="/lists" class="nav-link" active-class="nav-link-active">Ver Listas</router-link>
      <router-link to="/lists/create" class="nav-link" active-class="nav-link-active">Crear Lista</router-link>
      <button
        @click="$emit('logout')"
        class="bg-white/10 text-white/80 border border-white/20 px-4 py-1.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-white/20 hover:text-white hover:border-white/40 active:scale-95"
      >
        Cerrar Sesión
      </button>
    </div>
  </nav>
</template>

<script setup>
defineEmits(['logout'])
</script>
