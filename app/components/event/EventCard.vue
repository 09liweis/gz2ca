<template>
  <div
    class="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    @click="handleClick"
  >
    <!-- Gradient Header -->
    <div class="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>

    <!-- Card Content -->
    <div class="p-6">
      <!-- Date Badge -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2 text-blue-600 font-semibold">
          <div class="bg-blue-100 rounded-lg p-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="text-sm">{{ formatShortDate(event.date) }}</span>
        </div>
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-medium',
            event.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          ]"
        >
          {{ event.status === 'published' ? '已发布' : '草稿' }}
        </span>
      </div>

      <!-- Title -->
      <h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
        {{ event.tl }}
      </h2>

      <!-- Description -->
      <p class="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
        {{ event.desc || '暂无描述' }}
      </p>

      <!-- Event Info -->
      <div class="space-y-2 text-sm text-gray-500 mb-4">
        <div v-if="event.city" class="flex items-center">
          <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span class="font-medium text-gray-700">{{ event.city }}</span>
        </div>
        <div v-if="event.address" class="flex items-center">
          <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span class="text-gray-700 line-clamp-1">{{ event.address }}</span>
        </div>
      </div>

      <!-- Actions for Owner -->
      <div v-if="showActions" class="flex gap-2 pt-4 border-t" @click.stop>
        <Button
          type="button"
          variant="secondary"
          @click="$emit('edit', event)"
          class="flex-1 !px-4 !py-2 !bg-blue-50 !text-blue-600 hover:!bg-blue-100 text-sm font-medium !border-0 !rounded-lg"
          :full-width="false"
        >
          编辑
        </Button>
        <Button
          type="button"
          variant="danger"
          @click="$emit('delete', event)"
          class="flex-1 !px-4 !py-2 text-sm font-medium !rounded-lg"
          :full-width="false"
        >
          删除
        </Button>
      </div>

      <!-- View Details Arrow -->
      <div v-else class="flex items-center text-blue-600 text-sm font-medium pt-4 border-t group-hover:translate-x-2 transition-transform">
        查看详情
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  event: any
  showActions?: boolean
}

const router = useRouter()

const props = withDefaults(defineProps<Props>(), {
  showActions: false
})

defineEmits<{
  (e: 'edit', event: any): void
  (e: 'delete', event: any): void
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatShortDate = (date: string) => {
  const d = new Date(date)
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric'
  })
}

const handleClick = () => {
  router.push(`/events/${props.event._id}`)
}
</script>
