<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      fullWidth ? 'w-full' : '',
      customClass,
      variantClasses
    ]"
  >
    <span v-if="loading">{{ loadingText }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  loading: false,
  loadingText: '加载中...',
  fullWidth: true,
  customClass: ''
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-[#b78026] text-white hover:bg-[#b78026]/50',
    secondary: 'border border-[#b78026] text-[#b78026] hover:bg-[#b78026]/50',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  return variants[props.variant]
})
</script>
