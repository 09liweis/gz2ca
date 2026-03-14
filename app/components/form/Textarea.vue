<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  rows?: number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  rows: 4,
  required: false,
  disabled: false
})

defineEmits(['update:modelValue'])
</script>
