import api from './index'

export function getPlaylists() {
  return api.get('/lists')
}

export function getPlaylist(listName) {
  return api.get(`/lists/${encodeURIComponent(listName)}`)
}

export function createPlaylist(playlist) {
  return api.post('/lists', playlist)
}

export function deletePlaylist(listName) {
  return api.delete(`/lists/${encodeURIComponent(listName)}`)
}
