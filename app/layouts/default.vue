<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '~/composables/useAuth'

const { initAuth } = useUser()

// Initialize auth state on app mount
onMounted(async () => {
  await initAuth()
})
</script>
