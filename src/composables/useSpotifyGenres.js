import { ref, onMounted } from 'vue'
import { getSpotifyGenres } from '../api/spotify'

export function useSpotifyGenres() {
  const genres = ref([])
  const loading = ref(false)

  async function load() {
    loading.value = true
    try {
      const response = await getSpotifyGenres()
      genres.value = response.data || []
    } catch (err) {
      genres.value = []
    } finally {
      loading.value = false
    }
  }

  return { genres, loading, load }
}
