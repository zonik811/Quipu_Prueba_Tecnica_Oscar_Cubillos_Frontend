<template>
  <div class="space-y-3 animate-fade-in">
    <div v-for="i in count" :key="i" class="card">
      <div class="skeleton h-5 w-48 rounded mb-3"></div>
      <div class="skeleton h-3 w-full rounded mb-2"></div>
      <div class="skeleton h-3 w-32 rounded"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 3 }
})
</script>
