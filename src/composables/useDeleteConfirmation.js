import { ref } from 'vue'

export function useDeleteConfirmation() {
  const pendingItem = ref(null)

  function confirm(itemName) {
    pendingItem.value = itemName
  }

  function cancel() {
    pendingItem.value = null
  }

  function isOpen() {
    return pendingItem.value !== null
  }

  return { pendingItem, confirm, cancel, isOpen }
}
