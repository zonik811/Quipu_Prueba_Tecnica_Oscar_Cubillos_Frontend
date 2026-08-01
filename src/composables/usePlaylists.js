import { ref } from 'vue'
import { getPlaylists, getPlaylist, createPlaylist, deletePlaylist } from '../api/playlists'

export function usePlaylists() {
  const playlists = ref([])
  const playlist = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function loadAll() {
    loading.value = true
    error.value = ''
    try {
      const response = await getPlaylists()
      playlists.value = response.data
    } catch (err) {
      error.value = 'Error al cargar las listas'
    } finally {
      loading.value = false
    }
  }

  async function loadOne(listName) {
    loading.value = true
    error.value = ''
    try {
      const response = await getPlaylist(listName)
      playlist.value = response.data
    } catch (err) {
      error.value = err.response?.status === 404
        ? 'Lista no encontrada'
        : 'Error al cargar la lista'
    } finally {
      loading.value = false
    }
  }

  async function add(payload) {
    loading.value = true
    error.value = ''
    try {
      await createPlaylist(payload)
      return true
    } catch (err) {
      error.value = err.response?.status === 400
        ? 'Datos de la lista inválidos'
        : 'Error al crear la lista'
      return false
    } finally {
      loading.value = false
    }
  }

  async function remove(listName) {
    try {
      await deletePlaylist(listName)
      playlists.value = playlists.value.filter((l) => l.nombre !== listName)
      return true
    } catch (err) {
      error.value = 'Error al eliminar la lista'
      return false
    }
  }

  return { playlists, playlist, loading, error, loadAll, loadOne, add, remove }
}
