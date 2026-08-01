# Listas de Reproducción — Full Stack (Spring Boot + Vue 3)

Proyecto full stack para gestión de listas de reproducción con autenticación JWT, consumo de API de Spotify para géneros musicales, y frontend en Vue 3 con Tailwind CSS.

---

## Requisitos previos

- Java 17+
- Maven 3.8+
- Node.js 18+
- Cuenta de Spotify Developer (para obtener géneros)

---

## 1. Backend — Spring Boot

### Commit 1: Inicializar proyecto Spring Boot

Usar [Spring Initializr](https://start.spring.io/) con:

- **Project:** Maven
- **Spring Boot:** 3.x
- **Dependencies:** Spring Web, Spring Data JPA, H2 Database, Spring Security, Lombok

```bash
unzip demo.zip -d backend
cd backend
git init && git add . && git commit -m "chore: init Spring Boot project"
```

Estructura base generada:
```
backend/
├── pom.xml
├── src/main/java/.../Application.java
├── src/main/resources/application.properties
└── src/test/java/.../ApplicationTests.java
```

### Commit 2: Configurar H2 y application.properties

`src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:h2:mem:playlistsdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=update
```

```bash
git add . && git commit -m "feat: configure H2 in-memory database"
```

### Commit 3: Crear entidades JPA

`src/main/java/.../model/Playlist.java`:
```java
@Entity
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String nombre;
    private String descripcion;
    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cancion> canciones = new ArrayList<>();
}
```

`src/main/java/.../model/Cancion.java`:
```java
@Entity
public class Cancion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String artista;
    private String album;
    private String anno;
    private String genero;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;
}
```

```bash
git add . && git commit -m "feat: create JPA entities Playlist and Cancion"
```

### Commit 4: Crear repositorios

`src/main/java/.../repository/PlaylistRepository.java`:
```java
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Optional<Playlist> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}
```

```bash
git add . && git commit -m "feat: create JPA repositories"
```

### Commit 5: Implementar servicio de playlists

`src/main/java/.../service/PlaylistService.java`:
```java
@Service
public class PlaylistService {
    // findAll(), findByNombre(), save(), deleteByNombre()
}
```

```bash
git add . && git commit -m "feat: implement PlaylistService CRUD"
```

### Commit 6: Crear DTOs

```java
// PlaylistDTO, CancionDTO, PlaylistResponseDTO
```

```bash
git add . && git commit -m "feat: create DTOs for request/response"
```

### Commit 7: Implementar controlador REST

`src/main/java/.../controller/PlaylistController.java`:
```java
@RestController
@RequestMapping("/lists")
public class PlaylistController {

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody PlaylistDTO dto) {
        // POST /lists → 201 Created
    }

    @GetMapping
    public ResponseEntity<List<PlaylistResponseDTO>> getAll() {
        // GET /lists → 200 OK
    }

    @GetMapping("/{listName}")
    public ResponseEntity<?> getOne(@PathVariable String listName) {
        // GET /lists/{listName} → 200 OK o 404
    }

    @DeleteMapping("/{listName}")
    public ResponseEntity<?> delete(@PathVariable String listName) {
        // DELETE /lists/{listName} → 204 No Content o 404
    }
}
```

```bash
git add . && git commit -m "feat: implement REST controller for /lists endpoints"
```

### Commit 8: Configurar Spring Security + JWT

```bash
# Añadir dependencia jjwt en pom.xml
# Crear JwtUtil, JwtAuthFilter, SecurityConfig
git add . && git commit -m "feat: add JWT authentication and authorization"
```

Endpoints de autenticación:
- `POST /auth/login` → `{ username, password }` → `{ token, user }`
- `POST /auth/register` → `{ username, password }` → `201 Created`

### Commit 9: Consumir API de Spotify para géneros

```java
// SpotifyService que llama a GET https://api.spotify.com/v1/recommendations/available-genre-seeds
// con token OAuth2 client_credentials
```

Controlador:
```java
@RestController
@RequestMapping("/spotify")
public class SpotifyController {
    @GetMapping("/genres")
    public List<String> getGenres() { ... }
}
```

```bash
git add . && git commit -m "feat: consume Spotify API for music genres"
```

### Commit 10: Pruebas unitarias

```java
@WebMvcTest(PlaylistController.class)
class PlaylistControllerTest {
    // Test POST /lists con nombre null → 400
    // Test GET /lists/{name} con nombre inexistente → 404
    // Test DELETE con éxito → 204
}
```

```bash
git add . && git commit -m "test: add unit tests for playlist controller"
```

---

## 2. Frontend — Vue 3 + Vite + Tailwind

### Commit 11: Inicializar proyecto Vue

```bash
mkdir vue-frontend && cd vue-frontend
```

Crear `package.json`:
```json
{
  "name": "vue-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.8.4",
    "pinia": "^2.3.0",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@vitejs/plugin-vue": "^5.2.3",
    "tailwindcss": "^4.1.4",
    "vite": "^6.2.4"
  }
}
```

```bash
npm install
git init && git add . && git commit -m "chore: init Vue 3 + Vite project"
```

Crear estructura de directorios:
```
vue-frontend/
├── index.html
├── package.json
├── vite.config.js
├── .env
├── .env.example
├── .gitignore
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/
    │   └── main.css
    ├── api/
    │   ├── index.js
    │   ├── auth.js
    │   ├── playlists.js
    │   └── spotify.js
    ├── composables/
    │   ├── usePlaylists.js
    │   ├── useDeleteConfirmation.js
    │   ├── useSpotifyGenres.js
    │   └── useToast.js
    ├── components/
    │   ├── Navbar.vue
    │   ├── PlaylistCard.vue
    │   ├── SongForm.vue
    │   ├── SongItem.vue
    │   ├── EmptyState.vue
    │   ├── LoadingSkeleton.vue
    │   ├── ToastContainer.vue
    │   └── ConfirmDialog.vue
    ├── router/
    │   └── index.js
    ├── stores/
    │   └── auth.js
    ├── utils/
    │   ├── token.js
    │   └── cookies.js
    └── views/
        ├── LoginView.vue
        ├── PlaylistsView.vue
        ├── CreatePlaylistView.vue
        └── PlaylistDetailView.vue
```

### Commit 12: Configurar Vite + Tailwind + proxy

`vite.config.js`:
```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [vue(), tailwindcss()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      minify: 'esbuild',
      esbuild: { drop: ['console', 'debugger'] }
    }
  }
})
```

`src/assets/main.css`:
```css
@import "tailwindcss";

@theme {
  --color-spotify: #1db954;
  --color-spotify-hover: #1ed760;
  --color-spotify-dark: #191414;
}
/* Keyframes + @layer base + @layer components ... */
```

`.env`:
```
VITE_API_BASE_URL=http://localhost:8081
```

`index.html` con CSP y headers de seguridad.

```bash
git add . && git commit -m "feat: configure Vite, Tailwind CSS v4, proxy, CSP and security headers"
```

### Commit 13: Crear capa de API (Axios)

`src/api/index.js` — instancia Axios con:
- `withCredentials: true` para cookies httpOnly
- Interceptor que añade `Authorization: Bearer` desde localStorage
- Interceptor que añade `X-CSRF-Token` desde cookie `XSRF-TOKEN`
- Interceptor que redirige a `/login` ante 401

`src/api/auth.js`:
```js
export function login(username, password) {
  return api.post('/auth/login', { username, password })
}
```

`src/api/playlists.js`:
```js
export function getPlaylists() { return api.get('/lists') }
export function getPlaylist(listName) { return api.get(`/lists/${encodeURIComponent(listName)}`) }
export function createPlaylist(playlist) { return api.post('/lists', playlist) }
export function deletePlaylist(listName) { return api.delete(`/lists/${encodeURIComponent(listName)}`) }
```

`src/api/spotify.js`:
```js
export function getSpotifyGenres() { return api.get('/spotify/genres') }
```

```bash
git add . && git commit -m "feat: create API layer with JWT interceptor, CSRF token and CORS"
```

### Commit 14: Crear router + guards de autenticación

`src/router/index.js`:
- Rutas: `/login`, `/lists`, `/lists/create`, `/lists/:listName`
- `meta: { requiresAuth: true }` en rutas protegidas
- `beforeEach`: validar token JWT (decodificar, verificar `exp`)
- Redirigir a `/login` si token inválido o ausente

`src/utils/token.js`:
```js
export function isTokenValid(token) { ... } // decodifica JWT, verifica exp
```

```bash
git add . && git commit -m "feat: add Vue Router with JWT expiry validation guards"
```

### Commit 15: Crear store de autenticación (Pinia)

`src/stores/auth.js`:
```js
export const useAuthStore = defineStore('auth', () => {
  // estado: token, user, loading, error
  // doLogin() → POST /auth/login → guarda token en localStorage
  // logout() → limpia localStorage
  // Solo persiste token si no está expirado
})
```

```bash
git add . && git commit -m "feat: create Pinia auth store with JWT persistence"
```

### Commit 16: Crear composables (hooks)

**`usePlaylists.js`** — lógica CRUD compartida:
```js
export function usePlaylists() {
  const playlists = ref([])
  const playlist = ref(null)
  const loading = ref(false)
  const error = ref('')
  // loadAll(), loadOne(), add(), remove()
}
```

**`useSpotifyGenres.js`** — carga géneros desde backend:
```js
export function useSpotifyGenres() {
  const genres = ref([])
  // load()
}
```

**`useToast.js`** — notificaciones toast (estado global compartido):
```js
export function useToast() {
  // toasts reactive array
  // success(), error(), warning(), remove()
}
```

**`useDeleteConfirmation.js`** — control de modal de confirmación:
```js
export function useDeleteConfirmation() {
  // confirm(itemName), cancel(), isOpen()
}
```

```bash
git add . && git commit -m "feat: create composables (usePlaylists, useToast, useSpotifyGenres, useDeleteConfirmation)"
```

### Commit 17: Crear componentes reutilizables

- **Navbar.vue** — barra de navegación con links + logout
- **PlaylistCard.vue** — tarjeta de playlist con animación stagger
- **SongForm.vue** — formulario de canción (título, artista, álbum, año como `type="number"`, género desde Spotify)
- **SongItem.vue** — fila de canción en vista de detalle
- **EmptyState.vue** — estado vacío con icono configurable
- **LoadingSkeleton.vue** — skeleton loader con shimmer
- **ToastContainer.vue** — contenedor de toasts con animaciones
- **ConfirmDialog.vue** — modal de confirmación para eliminación

```bash
git add . && git commit -m "feat: create reusable components with animations and validation"
```

### Commit 18: Crear vistas

**LoginView.vue**:
- Formulario con `minlength`, `maxlength`, `autocomplete` correcto
- Spinner en botón durante loading
- Mensaje de error genérico (sin leaks del servidor)

**PlaylistsView.vue**:
- Skeleton loading mientras carga
- EmptyState si no hay playlists
- Cards con animación stagger
- ConfirmDialog para eliminación
- Toast de feedback

**CreatePlaylistView.vue**:
- Validación de nombre (obligatorio, max 100 chars)
- Canciones dinámicas con SongForm
- TransitionGroup al añadir/quitar canciones
- Géneros cargados desde Spotify vía backend
- Toast de éxito al crear

**PlaylistDetailView.vue**:
- Detalle de playlist con canciones
- TransitionGroup con stagger por canción
- ConfirmDialog para eliminación

```bash
git add . && git commit -m "feat: implement all views with validation, animations and toast feedback"
```

### Commit 19: Integrar App.vue con layout y transiciones

```html
<Navbar v-if="$route.name !== 'Login'" @logout="handleLogout" />
<main>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</main>
<ToastContainer :toasts="toast.toasts" @remove="toast.remove" />
```

```bash
git add . && git commit -m "feat: wire App.vue with layout transitions and global toast"
```

### Commit 20: Seguridad OWASP

- CSP en `index.html`
- `X-Content-Type-Options`, `Referrer-Policy`
- CSRF token en axios interceptor
- `withCredentials: true` para cookies httpOnly
- `encodeURIComponent` en URLs de playlists
- `console.drop` en build de producción
- `.env` para URL del backend
- `.gitignore` con `.env` y `node_modules`

```bash
git add . && git commit -m "security: OWASP hardening (CSP, CSRF, JWT validation, input sanitization)"
```

---

## 3. Ejecución

### Backend
```bash
cd backend
mvn spring-boot:run
# Arranca en http://localhost:8080
```

### Frontend
```bash
cd vue-frontend
npm install
npm run dev
# Arranca en http://localhost:5173
```

El proxy de Vite redirige `/api/*` al backend. El puerto del backend se configura en `.env`.

---

## 4. API Endpoints esperados por el frontend

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | `{ username, password }` → `{ token, user }` |
| GET | `/lists` | Listar todas las playlists |
| POST | `/lists` | Crear playlist (400 si nombre inválido) |
| GET | `/lists/{listName}` | Detalle de playlist (404 si no existe) |
| DELETE | `/lists/{listName}` | Eliminar playlist (404 si no existe) |
| GET | `/spotify/genres` | Array de strings con géneros |

### Headers esperados
- `Authorization: Bearer <jwt>` — en cada request autenticado
- `X-CSRF-Token: <token>` — en POST/PUT/DELETE (se lee de cookie `XSRF-TOKEN`)
- Cookie `XSRF-TOKEN` — debe ser seteada por el backend (no-httpOnly)

---

## 5. Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8080` | URL del backend Spring Boot |

---

## 6. Estructura final del proyecto

```
PruerbaTecnicaJavaVue/
├── backend/                          # Spring Boot (a crear)
│   ├── pom.xml
│   └── src/main/java/...
│       ├── model/Playlist.java
│       ├── model/Cancion.java
│       ├── repository/
│       ├── service/
│       ├── controller/
│       ├── security/
│       └── config/
└── vue-frontend/                     # Vue 3
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── .env / .env.example / .gitignore
    └── src/
        ├── main.js
        ├── App.vue
        ├── assets/main.css
        ├── api/        (axios + interceptors)
        ├── composables/ (usePlaylists, useToast, ...)
        ├── components/  (Navbar, PlaylistCard, SongForm, ...)
        ├── router/      (Vue Router + guards)
        ├── stores/      (Pinia auth store)
        ├── utils/       (token.js, cookies.js)
        └── views/       (Login, Playlists, Create, Detail)
```
