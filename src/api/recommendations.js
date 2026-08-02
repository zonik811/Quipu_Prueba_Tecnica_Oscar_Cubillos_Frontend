import { getCookie } from '../utils/cookies'

const BASE = '/api'

function csrfHeaders() {
  const token = getCookie('XSRF-TOKEN')
  return token ? { 'X-CSRF-Token': token } : {}
}

export async function fetchRecommendations(listName, userToken) {
  const res = await fetch(
    `${BASE}/lists/${encodeURIComponent(listName)}/recommendations`,
    {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
        ...csrfHeaders()
      }
    }
  )

  if (res.status === 503) {
    throw { status: 503, message: 'IA no disponible' }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw { status: res.status, message: body.message || 'Error al cargar recomendaciones' }
  }

  return res.json()
}
