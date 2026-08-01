<template>
  <div
    class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm
           transition-all duration-300 hover:shadow-md hover:border-spotify/20 hover:bg-spotify/5"
    :style="{ animationDelay: `${delay}s` }"
  >
    <span class="font-bold text-spotify text-lg min-w-8 text-center opacity-70">{{ index + 1 }}</span>
    <div class="flex flex-col flex-1 min-w-0">
      <strong class="text-gray-900 truncate">{{ song.titulo || 'Sin título' }}</strong>
      <span class="text-sm text-gray-400 truncate">{{ song.artista || 'Artista desconocido' }}</span>
    </div>
    <div class="flex gap-2 flex-wrap text-xs text-gray-400 shrink-0">
      <span v-if="song.album" class="bg-gray-100 px-2 py-0.5 rounded-full">{{ song.album }}</span>
      <span v-if="song.anno" class="bg-gray-100 px-2 py-0.5 rounded-full">{{ song.anno }}</span>
      <span v-if="song.genero" class="badge-spotify">{{ song.genero }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  song: { type: Object, required: true },
  index: { type: Number, required: true },
  delay: { type: Number, default: 0 }
})
</script>
