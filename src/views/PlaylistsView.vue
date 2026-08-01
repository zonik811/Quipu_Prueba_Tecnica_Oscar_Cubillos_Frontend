<template>
  <div>
    <ConfirmDialog
      :is-open="confirmDialog.isOpen()"
      :item-name="confirmDialog.pendingItem.value || ''"
      @confirm="onConfirmDelete"
      @cancel="confirmDialog.cancel()"
    />

    <div class="flex justify-between items-center mb-6 animate-slide-down">
      <h1 class="page-title">Listas de Reproducción</h1>
      <router-link to="/lists/create" class="btn-primary !w-auto !py-2.5 !px-5 no-underline inline-flex items-center gap-2">
        <span class="text-lg leading-none">+</span> Nueva Lista
      </router-link>
    </div>

    <LoadingSkeleton v-if="loading" />
    <EmptyState v-else-if="error" icon="⚠" :title="error" />
    <EmptyState v-else-if="playlists.length === 0" icon="🎵" title="No hay listas de reproducción" description="Crea la primera" />

    <div v-else class="grid gap-4">
      <PlaylistCard
        v-for="(list, index) in playlists"
        :key="list.nombre"
        :playlist="list"
        :delay="index * 0.08"
        @delete="handleDeleteRequest"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePlaylists } from '../composables/usePlaylists'
import { useDeleteConfirmation } from '../composables/useDeleteConfirmation'
import { useToast } from '../composables/useToast'
import PlaylistCard from '../components/PlaylistCard.vue'
import LoadingSkeleton from '../components/LoadingSkeleton.vue'
import EmptyState from '../components/EmptyState.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const { playlists, loading, error, loadAll, remove } = usePlaylists()
const confirmDialog = useDeleteConfirmation()
const toast = useToast()

let pendingDeleteName = ''

function handleDeleteRequest(listName) {
  pendingDeleteName = listName
  confirmDialog.confirm(listName)
}

async function onConfirmDelete() {
  confirmDialog.cancel()
  const ok = await remove(pendingDeleteName)
  if (ok) {
    toast.success(`"${pendingDeleteName}" eliminada`)
  } else {
    toast.error('Error al eliminar la lista')
  }
}

onMounted(loadAll)
</script>
