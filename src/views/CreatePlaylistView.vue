<template>
  <div>
    <div class="flex justify-between items-center mb-6 animate-slide-down">
      <h1 class="page-title">Crear Lista de Reproducción</h1>
      <router-link to="/lists" class="text-gray-400 no-underline font-semibold text-sm transition-colors duration-200 hover:text-spotify">
        ← Volver
      </router-link>
    </div>

    <form @submit.prevent="handleSubmit" class="card !p-8 animate-scale-in">
      <div class="space-y-4">
        <div>
          <label for="nombre" class="block mb-1.5 font-semibold text-sm text-gray-600">
            Nombre de la lista <span class="text-red-400">*</span>
          </label>
          <input id="nombre" v-model="form.nombre" type="text" required minlength="1" maxlength="100" placeholder="Ej: Mis Favoritas" class="input-field" />
          <p v-if="validationErrors.nombre" class="error-text mt-1">{{ validationErrors.nombre }}</p>
        </div>
        <div>
          <label for="descripcion" class="block mb-1.5 font-semibold text-sm text-gray-600">Descripción</label>
          <textarea id="descripcion" v-model="form.descripcion" rows="2" maxlength="500" placeholder="Descripción de la lista" class="input-field resize-none"></textarea>
        </div>
      </div>

      <hr class="my-6 border-gray-100" />

      <div>
        <div class="flex justify-between items-center mb-4">
          <h3 class="section-title">Canciones</h3>
          <button type="button" @click="addSong" class="btn-outline flex items-center gap-1">
            <span class="text-lg leading-none">+</span> Añadir
          </button>
        </div>

        <EmptyState v-if="form.canciones.length === 0" icon="🎶" title="Añade canciones a tu lista" class="!py-8 mb-4" />

        <TransitionGroup name="song-list" tag="div" class="space-y-4">
          <SongForm
            v-for="(song, index) in form.canciones"
            :key="index"
            :song="song"
            :index="index"
            :genres="genres"
            @remove="removeSong"
            @update="updateSong"
          />
        </TransitionGroup>
      </div>

      <p v-if="errorMsg" class="error-text mt-4 animate-fade-in">⚠ {{ errorMsg }}</p>

      <button type="submit" :disabled="submitting" class="btn-primary mt-6">
        <span v-if="submitting" class="inline-flex items-center gap-2">
          <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Creando...
        </span>
        <span v-else>Crear Lista</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaylists } from '../composables/usePlaylists'
import { useSpotifyGenres } from '../composables/useSpotifyGenres'
import { useToast } from '../composables/useToast'
import SongForm from '../components/SongForm.vue'
import EmptyState from '../components/EmptyState.vue'

const router = useRouter()
const { add } = usePlaylists()
const { genres, load: loadGenres } = useSpotifyGenres()
const toast = useToast()

const submitting = ref(false)
const errorMsg = ref('')
const validationErrors = reactive({ nombre: '' })

const form = reactive({
  nombre: '',
  descripcion: '',
  canciones: []
})

function addSong() {
  form.canciones.push({
    titulo: '',
    artista: '',
    album: '',
    anno: '',
    genero: ''
  })
}

function removeSong(index) {
  form.canciones.splice(index, 1)
}

function updateSong({ index, field, value }) {
  form.canciones[index][field] = value
}

function validate() {
  validationErrors.nombre = ''
  if (!form.nombre.trim()) {
    validationErrors.nombre = 'El nombre es obligatorio'
    return false
  }
  if (form.nombre.trim().length > 100) {
    validationErrors.nombre = 'Máximo 100 caracteres'
    return false
  }
  return true
}

async function handleSubmit() {
  errorMsg.value = ''
  if (!validate()) return

  submitting.value = true
  try {
    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      canciones: form.canciones.map((c) => ({
        titulo: c.titulo.trim(),
        artista: c.artista.trim(),
        album: c.album.trim(),
        anno: c.anno.trim(),
        genero: c.genero
      }))
    }
    const ok = await add(payload)
    if (ok) {
      toast.success('Lista creada correctamente')
      router.push('/lists')
    }
  } finally {
    submitting.value = false
  }
}

onMounted(loadGenres)
</script>

<style scoped>
.song-list-enter-active {
  animation: slide-up 0.35s ease-out;
}
.song-list-leave-active {
  animation: slide-up 0.25s ease-in reverse;
}
</style>
