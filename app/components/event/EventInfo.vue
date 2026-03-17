<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Event Date -->
    <div class="bg-gray-50 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">活动日期</p>
        <p class="text-gray-900 font-semibold truncate">{{ formatDate(event.date) }}</p>
      </div>
    </div>

    <!-- Event Address -->
    <div v-if="event.place_id?.full_address" class="bg-gray-50 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">活动地址</p>
        <p class="text-gray-900 font-semibold truncate">{{ event.place_id.full_address }}</p>
      </div>
    </div>

    <!-- City -->
    <div v-if="event.place_id?.city" class="bg-gray-50 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">城市</p>
        <p class="text-gray-900 font-semibold truncate">{{ event.place_id.city }}</p>
      </div>
    </div>

    <!-- Created Time -->
    <div class="bg-gray-50 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">创建时间</p>
        <p class="text-gray-900 font-semibold truncate">{{ formatDateTime(event.ts) }}</p>
      </div>
    </div>

    <!-- Last Modified -->
    <div v-if="event.mt" class="bg-gray-50 rounded-xl p-4 flex items-start gap-3 hover:shadow-md transition-shadow md:col-span-2">
      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">最后更新</p>
        <p class="text-gray-900 font-semibold truncate">{{ formatDateTime(event.mt) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  event: any
}

defineProps<Props>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
