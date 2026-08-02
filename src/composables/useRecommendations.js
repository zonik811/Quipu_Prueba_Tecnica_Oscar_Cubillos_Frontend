import { ref, onBeforeUnmount } from 'vue'
import { fetchRecommendations, RecommendationError } from '../api/recommendations'

/**
 * @type {Array<{ titulo: string, artista: string, razon: string }>}
 */
const FALLBACK = [
  { titulo: 'Bohemian Rhapsody', artista: 'Queen', razon: 'Porque es un clásico atemporal' },
  { titulo: 'Blinding Lights', artista: 'The Weeknd', razon: 'Por su energía y ritmo' },
  { titulo: 'Shape of You', artista: 'Ed Sheeran', razon: 'Por su popularidad global' },
  { titulo: 'Rolling in the Deep', artista: 'Adele', razon: 'Por su potencia vocal' },
  { titulo: 'Uptown Funk', artista: 'Mark Ronson ft. Bruno Mars', razon: 'Para levantar el ánimo' }
]

/**
 * @param {() => string} getListName  — función que retorna el nombre actual de la playlist
 */
export function useRecommendations(getListName) {
  /** @type {import('vue').Ref<Array<{ titulo: string, artista: string, razon: string }>>} */
  const recommendations = ref([])
  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(false)
  /** @type {import('vue').Ref<string>} */
  const error = ref('')
  /** @type {import('vue').Ref<boolean>} */
  const isFallback = ref(false)

  let controller = null

  async function load() {
    if (controller) controller.abort()
    controller = new AbortController()

    loading.value = true
    error.value = ''
    isFallback.value = false
    recommendations.value = []

    try {
      const data = await fetchRecommendations(getListName(), controller.signal)
      recommendations.value = data.recommendations || []
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return
      if (err instanceof RecommendationError && err.status === 503) {
        recommendations.value = FALLBACK
        isFallback.value = true
        error.value = 'IA no disponible, mostrando recomendaciones por defecto'
      } else {
        error.value = err.message || 'Error al cargar recomendaciones'
      }
    } finally {
      loading.value = false
    }
  }

  onBeforeUnmount(() => {
    if (controller) controller.abort()
  })

  return { recommendations, loading, error, isFallback, load }
}
