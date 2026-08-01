export function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const payload = parseJwt(token)
  if (!payload || !payload.exp) return true
  return payload.exp * 1000 < Date.now()
}

export function isTokenValid(token) {
  return token && typeof token === 'string' && token.length > 0 && !isTokenExpired(token)
}
