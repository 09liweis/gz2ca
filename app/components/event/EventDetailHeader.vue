<template>
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ event.tl }}</h1>
      <span
        :class="[
          'inline-block px-3 py-1 rounded-full text-sm font-medium',
          event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        ]"
      >
        {{ event.status === 'published' ? '已发布' : '草稿' }}
      </span>
    </div>
    <div v-if="isOwner">
      <Button
        @click="$emit('edit')"
        variant="secondary"
        size="sm"
      >
        编辑活动
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/form/Button.vue'

interface Props {
  event: {
    tl: string
    status: string
  }
  isOwner: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'edit'): void
}>()
</script>
