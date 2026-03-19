<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      <p class="mt-4 text-gray-600 text-lg">加载中...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="text-center py-16">
      <div class="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-red-600 font-medium">{{ errorMessage }}</p>
        <slot name="error-actions"></slot>
      </div>
    </div>

    <!-- Events List -->
    <div v-else-if="events.length > 0" :class="['grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3']">
      <EventCard
        v-for="event in events"
        :key="event._id"
        :event="event"
        :show-actions="showActions"
        :show-status="showStatus"
        @edit="$emit('edit', event)"
        @delete="$emit('delete', event)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="bg-white rounded-2xl shadow-md p-12 max-w-md mx-auto">
        <div class="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">暂无活动</h3>
        <p class="text-gray-500">{{ emptyMessage }}</p>
      </div>
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
  showStatus?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  errorMessage: '',
  emptyMessage: '还没有创建任何活动',
  columns: 3,
  showActions: false,
  showStatus: false
})

defineEmits<{
  (e: 'edit', event: any): void
  (e: 'delete', event: any): void
}>()
</script>
