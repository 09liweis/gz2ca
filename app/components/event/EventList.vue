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
    <div v-else-if="events.length > 0" :class="['grid gap-6', gridClass]">
      <div
        v-for="event in events"
        :key="event._id"
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ event.tl }}</h2>
          <p class="text-gray-600 mb-4 line-clamp-3">{{ event.desc || '暂无描述' }}</p>
          <div class="space-y-2 text-sm text-gray-500">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(event.date) }}</span>
            </div>
            <div v-if="event.address" class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{{ event.address }}</span>
            </div>
            <div v-if="event.city" class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{{ event.city }}</span>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t">
          <span
            :class="[
              'inline-block px-3 py-1 rounded-full text-xs font-medium',
              event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            ]"
          >
            {{ event.status === 'published' ? '已发布' : '草稿' }}
          </span>
        </div>
      </div>
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
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  errorMessage: '',
  emptyMessage: '还没有创建任何活动',
  columns: 3
})

const gridClass = computed(() => {
  const columns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }
  return columns[props.columns]
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
