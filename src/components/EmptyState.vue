<template>
  <div class="empty-state animate-fade-in">
    <span class="text-4xl block mb-2">{{ icon }}</span>
    <p class="text-gray-400 text-lg mb-1">{{ title }}</p>
    <p v-if="description" class="text-gray-300 text-sm">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '📭' },
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>
