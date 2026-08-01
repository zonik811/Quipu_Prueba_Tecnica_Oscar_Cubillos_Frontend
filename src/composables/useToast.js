import { ref, provide, inject } from 'vue'

const KEY = Symbol('toasts')

let state = null

function getState() {
  if (!state) {
    state = { toasts: ref([]), timers: new Map(), nextId: 0 }
  }
  return state
}

export function useToast() {
  const s = getState()

  function show(message, type = 'info', duration = 4000) {
    if (!message) return
    const id = s.nextId++
    s.toasts.value = [...s.toasts.value, { id, message, type }]
    if (duration > 0) {
      const timer = setTimeout(() => remove(id), duration)
      s.timers.set(id, timer)
    }
  }

  function success(message) { show(message, 'success') }
  function error(message) { show(message, 'error', 6000) }
  function warning(message) { show(message, 'warning') }

  function remove(id) {
    const timer = s.timers.get(id)
    if (timer) { clearTimeout(timer); s.timers.delete(id) }
    s.toasts.value = s.toasts.value.filter(t => t.id !== id)
  }

  function clearAll() {
    s.timers.forEach(t => clearTimeout(t))
    s.timers.clear()
    s.toasts.value = []
  }

  provide(KEY, s.toasts)

  return { toasts: s.toasts, show, success, error, warning, remove, clearAll }
}

export function useToastState() {
  return inject(KEY, ref([]))
}
