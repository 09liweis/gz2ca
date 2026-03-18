<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="item in infoItems" :key="item.key" class="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
      <div class="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.iconPath" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{{ item.label }}</p>
        <p v-if="item.key === 'name' && event.place_id?.name" class="text-gray-900 font-semibold truncate cursor-pointer hover:text-blue-600 underline">
          <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.place_id.name)}`" target="_blank" rel="noopener noreferrer">
            {{ item.value }}
          </a>
        </p>
        <p v-else class="text-gray-900 font-semibold truncate">{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  event: any
}

const props = defineProps<Props>()

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

const infoItems = computed(() => {
  const items: Array<{
    key: string
    label: string
    value: string
    iconPath: string
  }> = []

  // Event Date
  if (props.event.date) {
    items.push({
      key: 'date',
      label: '活动日期',
      value: formatDate(props.event.date),
      iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    })
  }

  // Place Name
  if (props.event.place_id?.name) {
    items.push({
      key: 'name',
      label: '地点名称',
      value: props.event.place_id.name,
      iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z'
    })
  }

  // Event Address
  if (props.event.place_id?.full_address) {
    items.push({
      key: 'address',
      label: '活动地址',
      value: props.event.place_id.full_address,
      iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    })
  }

  // City
  if (props.event.place_id?.city) {
    items.push({
      key: 'city',
      label: '城市',
      value: props.event.place_id.city,
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    })
  }

  return items
})
</script>
