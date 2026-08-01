<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center" @click.self="$emit('cancel')">
      <div class="absolute inset-0 bg-black/40 animate-fade-in"></div>
      <div class="relative bg-white rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full animate-scale-in">
        <h3 class="text-lg font-bold text-spotify-dark mb-2">Confirmar eliminación</h3>
        <p class="text-gray-500 text-sm mb-6">
          ¿Estás seguro de eliminar <strong>"{{ itemName }}"</strong>? Esta acción no se puede deshacer.
        </p>
        <div class="flex gap-3 justify-end">
          <button @click="$emit('cancel')" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            Cancelar
          </button>
          <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors cursor-pointer">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, required: true },
  itemName: { type: String, default: '' }
})

defineEmits(['confirm', 'cancel'])
</script>
