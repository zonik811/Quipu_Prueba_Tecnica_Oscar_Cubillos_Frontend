import api from './index'

export function getSpotifyGenres() {
  return api.get('/spotify/genres')
}
