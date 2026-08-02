import { ref } from 'vue'
import { fetchRecommendations } from '../api/recommendations'

const FALLBACK = [
  { titulo: 'Bohemian Rhapsody', artista: 'Queen', razon: 'Porque es un clásico atemporal' },
  { titulo: 'Blinding Lights', artista: 'The Weeknd', razon: 'Por su energía y ritmo' },
  { titulo: 'Shape of You', artista: 'Ed Sheeran', razon: 'Por su popularidad global' },
  { titulo: 'Rolling in the Deep', artista: 'Adele', razon: 'Por su potencia vocal' },
  { titulo: 'Uptown Funk', artista: 'Mark Ronson ft. Bruno Mars', razon: 'Para levantar el ánimo' }
]

export function useRecommendations(userToken) {
  const recommendations = ref([])
  const loading = ref(false)
  const error = ref('')
  const isFallback = ref(false)

  async function load(listName) {
    loading.value = true
    error.value = ''
    isFallback.value = false
    recommendations.value = []

    try {
      const data = await fetchRecommendations(listName, userToken)
      recommendations.value = data.recommendations || []
    } catch (err) {
      if (err.status === 503) {
        recommendations.value = FALLBACK
        isFallback.value = true
        error.value = 'IA no disponible, mostrando recomendaciones por defecto'
      } else if (err.status === 404) {
        error.value = 'Lista no encontrada'
      } else {
        error.value = err.message || 'Error de conexión'
      }
    } finally {
      loading.value = false
    }
  }

  return { recommendations, loading, error, isFallback, load }
}
