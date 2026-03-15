<template>
  <div class="bg-white border-b shadow-sm sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex gap-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="$emit('update:activeTab', tab.id)"
          :class="[
            'py-4 px-2 border-b-2 font-medium text-sm transition-colors relative',
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
          {{ tab.label }}
          <span v-if="tab.count !== undefined && tab.count > 0" class="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'

interface Tab {
  id: string
  label: string
  icon: any
  count?: number
}

interface Props {
  activeTab: string
  tabs: Tab[]
}

defineProps<Props>()
defineEmits<{
  'update:activeTab': [value: string]
}>()

</script>
