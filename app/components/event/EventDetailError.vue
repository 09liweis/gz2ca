<template>
  <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
    <p class="text-red-600">{{ message }}</p>
    <Button @click="$router.push('/events')" variant="secondary" class="mt-4">
      返回活动列表
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '~/components/form/Button.vue'

interface Props {
  message: string
}

defineProps<Props>()

const $router = useRouter()
</script>
