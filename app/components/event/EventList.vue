<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">加载中...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="text-center py-12">
      <p class="text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- Events List -->
    <div v-else-if="events.length > 0" :class="['grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3']">
      <EventCard
        v-for="event in events"
        :key="event._id"
        :event="event"
        :show-actions="showActions"
        @edit="$emit('edit', event)"
        @delete="$emit('delete', event)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无活动</h3>
      <p class="mt-1 text-sm text-gray-500">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  events: any[]
  loading?: boolean
  errorMessage?: string
  emptyMessage?: string
  columns?: 1 | 2 | 3
  showActions?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  errorMessage: '',
  emptyMessage: '还没有创建任何活动',
  columns: 3,
  showActions: false
})

defineEmits<{
  (e: 'edit', event: any): void
  (e: 'delete', event: any): void
}>()
</script>
