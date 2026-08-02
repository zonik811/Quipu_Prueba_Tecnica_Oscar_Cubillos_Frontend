<template>
  <div>
    <ConfirmDialog
      :is-open="confirmDialog.isOpen()"
      :item-name="confirmDialog.pendingItem.value || ''"
      @confirm="onConfirmDelete"
      @cancel="confirmDialog.cancel()"
    />

    <div class="mb-6 animate-slide-down">
      <router-link to="/lists" class="text-gray-400 no-underline font-semibold text-sm transition-colors duration-200 hover:text-spotify">
        ← Volver a listas
      </router-link>
    </div>

    <LoadingSkeleton v-if="loading" />
    <EmptyState v-else-if="error" icon="🔍" :title="error" />
    <template v-else-if="playlist">
      <div class="card !p-8 animate-scale-in">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h1 class="page-title">{{ playlist.nombre }}</h1>
            <p class="text-gray-500 mt-2">{{ playlist.descripcion || 'Sin descripción' }}</p>
          </div>
          <button @click="handleDeleteRequest" class="btn-danger">Eliminar lista</button>
        </div>
      </div>

      <div class="mt-6">
        <div class="flex items-center gap-2 mb-4">
          <h3 class="section-title">Canciones</h3>
          <span class="badge-gray">{{ playlist.canciones?.length || 0 }}</span>
        </div>

        <EmptyState v-if="!playlist.canciones || playlist.canciones.length === 0" icon="🎶" title="Esta lista no tiene canciones" />

        <TransitionGroup v-else name="song-stagger" tag="div" class="space-y-2">
          <SongItem
            v-for="(song, index) in playlist.canciones"
            :key="index"
            :song="song"
            :index="index"
            :delay="index * 0.06"
          />
        </TransitionGroup>
      </div>

      <RecommendationPanel :list-name="playlist.nombre" :user-token="userToken" />
    </template>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlaylists } from '../composables/usePlaylists'
import { useDeleteConfirmation } from '../composables/useDeleteConfirmation'
import { useToast } from '../composables/useToast'
import SongItem from '../components/SongItem.vue'
import LoadingSkeleton from '../components/LoadingSkeleton.vue'
import EmptyState from '../components/EmptyState.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import RecommendationPanel from '../components/RecommendationPanel.vue'

const route = useRoute()
const router = useRouter()
const { playlist, loading, error, loadOne, remove } = usePlaylists()
const confirmDialog = useDeleteConfirmation()
const toast = useToast()

const userToken = localStorage.getItem('token') || ''

function handleDeleteRequest() {
  confirmDialog.confirm(playlist.value.nombre)
}

async function onConfirmDelete() {
  const name = playlist.value.nombre
  confirmDialog.cancel()
  const ok = await remove(name)
  if (ok) {
    toast.success(`"${name}" eliminada`)
    router.push('/lists')
  } else {
    toast.error('Error al eliminar la lista')
  }
}

onMounted(() => loadOne(route.params.listName))
</script>

<style scoped>
.song-stagger-enter-active {
  animation: slide-up 0.35s ease-out both;
}
.song-stagger-leave-active {
  animation: slide-up 0.2s ease-in reverse both;
}
</style>
