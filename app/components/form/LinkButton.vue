<template>
  <NuxtLink
    :to="to"
    :class="[variantClasses, customClass]"
    class="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 relative"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to: string
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'text-primary'
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  customClass: ''
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-[#11817b] text-white px-8 py-3 hover:bg-[#11817b]/90 hover:shadow-lg hover:shadow-[#11817b]/20 transform hover:scale-105'
    case 'secondary':
      return 'bg-[#b78026] text-white px-8 py-3 hover:bg-[#b78026]/90 hover:shadow-lg hover:shadow-[#b78026]/20 transform hover:scale-105'
    case 'primary-outline':
      return 'border-2 border-[#11817b] text-[#11817b] px-8 py-3 hover:bg-[#11817b]/10'
    case 'secondary-outline':
      return 'border-2 border-[#b78026] text-[#b78026] px-8 py-3 hover:bg-[#b78026]/10'
    case 'text-primary':
      return 'text-[#11817b] hover:text-[#11817b]/80'
    default:
      return 'bg-[#11817b] text-white px-8 py-3 hover:bg-[#11817b]/90'
  }
})
</script>
