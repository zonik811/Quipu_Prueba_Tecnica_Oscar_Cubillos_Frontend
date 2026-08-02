<template>
  <div class="mt-6 animate-slide-up">
    <div class="flex items-center gap-2 mb-4">
      <h3 class="font-semibold text-spotify-dark">Recomendaciones</h3>
      <span v-if="isFallback" class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">por defecto</span>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="skeleton h-14 rounded-lg"></div>
    </div>

    <div v-else-if="error && !recommendations.length" class="empty-state !py-6">
      <span class="text-2xl block mb-2">🤖</span>
      {{ error }}
    </div>

    <div v-else-if="!recommendations.length" class="empty-state !py-6">
      <span class="text-2xl block mb-2">📋</span>
      Sin recomendaciones disponibles
    </div>

    <div v-else class="space-y-2">
      <p v-if="isFallback" class="text-amber-600 text-xs mb-3 flex items-center gap-1">
        <span>⚠</span> IA no disponible, mostrando recomendaciones por defecto
      </p>
      <div
        v-for="(rec, index) in recommendations"
        :key="index"
        class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm
               transition-all duration-300 hover:shadow-md hover:border-spotify/20"
        :style="{ animationDelay: `${index * 0.06}s` }"
      >
        <span class="font-bold text-spotify text-lg min-w-8 text-center opacity-70">{{ index + 1 }}</span>
        <div class="flex flex-col flex-1 min-w-0">
          <strong class="text-gray-900 truncate">{{ rec.titulo }}</strong>
          <span class="text-sm text-gray-400 truncate">{{ rec.artista }}</span>
        </div>
        <span class="text-xs text-gray-400 italic shrink-0 max-w-40 text-right">{{ rec.razon }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecommendations } from '../composables/useRecommendations'

const props = defineProps({
  listName: { type: String, required: true },
  userToken: { type: String, default: '' }
})

const { recommendations, loading, error, isFallback, load } = useRecommendations(props.userToken)

load(props.listName)
</script>
