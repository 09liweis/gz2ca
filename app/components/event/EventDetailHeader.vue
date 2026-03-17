<template>
  <div class="flex items-start justify-between">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ event.tl }}</h1>
    <div v-if="isOwner">
      <Button
        @click="$emit('edit')"
        variant="secondary"
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
