<template>
  <div class="bg-white border-b shadow-sm sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex gap-8">
        <Button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          variant="secondary"
          :custom-class="[
            '!px-2 !py-4 !border-0 !border-b-2 !rounded-none font-medium text-sm relative',
            activeTab === tab.id
              ? '!border-blue-600 !text-blue-600 !bg-transparent'
              : '!border-transparent !text-gray-500 hover:!text-gray-700 hover:!border-gray-300 !bg-transparent'
          ].join(' ')"
          :full-width="false"
          @click="$emit('update:activeTab', tab.id)"
        >
          <component :is="tab.icon" class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
          {{ tab.label }}
          <span v-if="tab.count !== undefined && tab.count > 0" class="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
            {{ tab.count }}
          </span>
        </Button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import Button from '~/components/form/Button.vue'

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
