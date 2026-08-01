<template>
  <div
    class="card card-animated cursor-pointer"
    :style="{ animationDelay: `${delay}s` }"
    @click="$router.push(`/lists/${encodeURIComponent(playlist.nombre)}`)"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-gray-900 font-semibold text-lg truncate">{{ playlist.nombre }}</h3>
      <span class="badge-gray shrink-0 ml-2">{{ playlist.canciones?.length || 0 }} canciones</span>
    </div>
    <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ playlist.descripcion || 'Sin descripción' }}</p>
    <div class="flex gap-3">
      <router-link
        :to="`/lists/${encodeURIComponent(playlist.nombre)}`"
        class="text-spotify no-underline font-semibold text-sm transition-colors duration-200 hover:text-spotify-hover"
        @click.stop
      >
        Ver detalle →
      </router-link>
      <button @click.stop="$emit('delete', playlist.nombre)" class="btn-danger">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  playlist: { type: Object, required: true },
  delay: { type: Number, default: 0 }
})

defineEmits(['delete'])
</script>
