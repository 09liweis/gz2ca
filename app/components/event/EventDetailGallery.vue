<template>
  <div v-if="media.length > 0" class="bg-white rounded-xl shadow-lg overflow-hidden mt-8">
    <div class="p-8">
      <ImageGallery :media="media" :can-delete="canDelete" @delete="$emit('delete', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageGallery from '~/components/event/ImageGallery.vue'

interface Props {
  media: any[]
  canDelete: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'delete', item: any): void
}>()
</script>
