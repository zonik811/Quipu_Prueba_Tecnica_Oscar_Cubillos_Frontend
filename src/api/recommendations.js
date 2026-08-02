import api from './index'

export class RecommendationError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   */
  constructor(message, status) {
    super(message)
    this.name = 'RecommendationError'
    this.status = status
  }
}

/**
 * @param {string} listName
 * @param {AbortSignal} [signal]
 * @returns {Promise<{ playlist: string, recommendations: Array<{ titulo: string, artista: string, razon: string }> }>}
 */
export async function fetchRecommendations(listName, signal) {
  try {
    const { data } = await api.get(
      `/lists/${encodeURIComponent(listName)}/recommendations`,
      { signal }
    )
    return data
  } catch (err) {
    if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
      throw err
    }
    const status = err.response?.status || 0
    if (status === 503) {
      throw new RecommendationError('IA no disponible', 503)
    }
    if (status === 404) {
      throw new RecommendationError('Lista no encontrada', 404)
    }
    throw new RecommendationError(
      err.response?.data?.message || 'Error de conexión',
      status
    )
  }
}
