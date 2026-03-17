<template>
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-4">上传照片</h2>
    <ImageUploader @upload="$emit('upload', $event)" />
  </div>
</template>

<script setup lang="ts">
import ImageUploader from '~/components/event/ImageUploader.vue'

defineEmits<{
  (e: 'upload', files: File[]): void
}>()
</script>
