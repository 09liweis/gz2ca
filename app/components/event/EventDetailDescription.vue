<template>
  <div class="mb-8">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">活动描述</h2>
    <div class="prose prose-blue max-w-none text-gray-700 whitespace-pre-line">
      {{ event.desc || '暂无描述' }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  event: {
    desc?: string
  }
}

defineProps<Props>()
</script>
