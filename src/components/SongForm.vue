<template>
  <div class="bg-gray-50/80 border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-spotify/30 hover:shadow-sm">
    <div class="flex justify-between items-center mb-3">
      <span class="font-bold text-spotify text-sm bg-spotify/10 px-2.5 py-0.5 rounded-full">#{{ index + 1 }}</span>
      <button type="button" @click="$emit('remove', index)" class="text-gray-400 text-sm cursor-pointer transition-colors duration-200 hover:text-red-400">
        ✕ Eliminar
      </button>
    </div>
    <div class="grid gap-3">
      <div>
        <label :for="`titulo-${index}`" class="block mb-1 font-semibold text-xs text-gray-400 uppercase tracking-wide">Título *</label>
        <input :id="`titulo-${index}`" :value="song.titulo" @input="update('titulo', $event.target.value)" type="text" required maxlength="200" placeholder="Nombre de la canción" class="input-field !py-2 !text-sm" />
      </div>
      <div>
        <label :for="`artista-${index}`" class="block mb-1 font-semibold text-xs text-gray-400 uppercase tracking-wide">Artista *</label>
        <input :id="`artista-${index}`" :value="song.artista" @input="update('artista', $event.target.value)" type="text" required maxlength="200" placeholder="Nombre del artista" class="input-field !py-2 !text-sm" />
      </div>
      <div>
        <label :for="`album-${index}`" class="block mb-1 font-semibold text-xs text-gray-400 uppercase tracking-wide">Álbum</label>
        <input :id="`album-${index}`" :value="song.album" @input="update('album', $event.target.value)" type="text" maxlength="200" placeholder="Nombre del álbum" class="input-field !py-2 !text-sm" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label :for="`anno-${index}`" class="block mb-1 font-semibold text-xs text-gray-400 uppercase tracking-wide">Año</label>
          <input :id="`anno-${index}`" :value="song.anno" @input="update('anno', $event.target.value)" type="number" min="1900" max="2099" placeholder="2000" class="input-field !py-2 !text-sm" />
        </div>
        <div>
          <label :for="`genero-${index}`" class="block mb-1 font-semibold text-xs text-gray-400 uppercase tracking-wide">Género</label>
          <select :id="`genero-${index}`" :value="song.genero" @change="update('genero', $event.target.value)" class="input-field !py-2 !text-sm">
            <option value="">Seleccionar</option>
            <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  song: { type: Object, required: true },
  index: { type: Number, required: true },
  genres: { type: Array, default: () => [] }
})

const emit = defineEmits(['remove', 'update'])

function update(field, value) {
  emit('update', { index: props.index, field, value })
}
</script>
