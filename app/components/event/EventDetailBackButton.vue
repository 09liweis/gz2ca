<template>
  <Button
    type="button"
    variant="secondary"
    @click="$router.push('/events')"
    class="flex items-center text-gray-600 hover:text-gray-900 mb-6 !px-0 !py-0 !bg-transparent !border-0 !rounded-none"
    :full-width="false"
  >
    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    返回活动列表
  </Button>
</template>

<script setup lang="ts">
import Button from '~/components/form/Button.vue'
</script>
