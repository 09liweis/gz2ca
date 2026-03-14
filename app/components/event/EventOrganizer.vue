<template>
  <div class="flex items-center">
    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
      {{ initial }}
    </div>
    <div class="ml-4">
      <p class="text-sm text-gray-500">组织者</p>
      <p class="text-gray-900 font-medium">{{ organizerName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  organizer: {
    fn?: string
    ln?: string
    email?: string
  }
}

const props = defineProps<Props>()

const initial = computed(() => {
  const fn = props.organizer?.fn || ''
  const ln = props.organizer?.ln || ''
  return (fn[0] || '') + (ln[0] || '')
})

const organizerName = computed(() => {
  const fn = props.organizer?.fn || ''
  const ln = props.organizer?.ln || ''
  if (fn || ln) {
    return `${ln}${fn}`
  }
  return props.organizer?.email || '未知组织者'
})
</script>
