# Vue Frontend — Listas de Reproducción

Frontend en Vue 3 para gestionar listas de reproducción. Se conecta a un backend Spring Boot con autenticación JWT + CSRF.

## Requisitos

- Node.js 18+
- Backend Spring Boot corriendo (puerto configurable en `.env`)

## Instalación

```bash
npm install
cp .env.example .env
```

Editar `.env` con la URL de tu backend:

```
VITE_API_BASE_URL=http://localhost:8081
```

## Ejecución

```bash
npm run dev     # http://localhost:5173
npm run build   # compila a dist/
```

El proxy de Vite redirige `/api/*` al backend definido en `VITE_API_BASE_URL`.

## Estructura

```
src/
├── api/           # Axios + interceptors (JWT, CSRF, 401 redirect)
│   ├── index.js
│   ├── auth.js
│   ├── playlists.js
│   ├── spotify.js
│   └── recommendations.js
├── composables/   # Lógica reactiva reutilizable
│   ├── usePlaylists.js
│   ├── useSpotifyGenres.js
│   ├── useToast.js
│   ├── useDeleteConfirmation.js
│   └── useRecommendations.js
├── components/    # Componentes UI
│   ├── Navbar.vue
│   ├── PlaylistCard.vue
│   ├── SongForm.vue
│   ├── SongItem.vue
│   ├── RecommendationPanel.vue
│   ├── EmptyState.vue
│   ├── LoadingSkeleton.vue
│   ├── ToastContainer.vue
│   └── ConfirmDialog.vue
├── views/         # Páginas
│   ├── LoginView.vue
│   ├── PlaylistsView.vue
│   ├── CreatePlaylistView.vue
│   └── PlaylistDetailView.vue
├── router/        # Vue Router + guards JWT
├── stores/        # Pinia (auth)
├── utils/         # token.js, cookies.js
└── assets/        # main.css (Tailwind + tema)
```

## Endpoints consumidos

| Método | Ruta | Uso |
|--------|------|-----|
| POST | `/auth/login` | Login → JWT + cookie CSRF |
| GET | `/lists` | Listar playlists |
| POST | `/lists` | Crear playlist |
| GET | `/lists/{name}` | Detalle de playlist |
| DELETE | `/lists/{name}` | Eliminar playlist |
| GET | `/lists/{name}/recommendations` | Recomendaciones IA (fallback en 503) |
| GET | `/spotify/genres` | Géneros musicales |

## Seguridad

- **JWT**: se envía en header `Authorization: Bearer <token>` y se valida expiración en el router guard
- **CSRF**: cookie `XSRF-TOKEN` (no-httpOnly) se lee y envía como header `X-CSRF-Token` en mutaciones
- **CSP**: definido en `index.html` vía meta tag
- **Producción**: `console` y `debugger` eliminados del build
