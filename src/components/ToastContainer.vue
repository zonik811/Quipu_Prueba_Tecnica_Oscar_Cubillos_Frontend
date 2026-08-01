<template>
  <Teleport to="body">
    <div v-if="validToasts.length" class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <TransitionGroup name="toast">
        <div
          v-for="toast in validToasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          class="px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 cursor-pointer animate-slide-up"
          @click="$emit('remove', toast.id)"
        >
          <span>{{ icon(toast.type) }}</span>
          <span class="flex-1">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useToastState } from '../composables/useToast'

const toasts = useToastState()

const validToasts = computed(() => toasts.value.filter(t => t.message))

defineEmits(['remove'])

function toastClasses(type) {
  return {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-gray-800 text-white'
  }[type] || 'bg-gray-800 text-white'
}

function icon(type) {
  return { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }[type] || 'ℹ'
}
</script>

<style scoped>
.toast-enter-active { animation: slide-up 0.3s ease-out; }
.toast-leave-active { animation: slide-up 0.2s ease-in reverse; }
</style>
