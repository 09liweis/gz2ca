<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-[#11817b] text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{SITE_NAME}}</h1>
          <p class="text-xl text-blue-50 max-w-2xl mx-auto mb-8">
            探索精彩活动，共同创造美好回忆
          </p>
        </div>
      </div>
    </div>

    <!-- Filter & Sort Section -->
    <div class="bg-white border-b shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">{{ displayedEvents.length }}</span> 个活动
          </div>

          <div class="flex gap-3">
            <Button type="button" @click="filterView = 'all'" class="!px-4 !py-2 text-sm font-medium !rounded-lg"
              :class="filterView === 'all' ? '!bg-[#b78026] !text-white' : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'"
              :full-width="false">
              全部
            </Button>
            <Button type="button" @click="filterView = 'upcoming'" class="!px-4 !py-2 text-sm font-medium !rounded-lg"
              :class="filterView === 'upcoming' ? '!bg-[#b78026] !text-white' : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'"
              :full-width="false">
              即将举行
            </Button>
            <Button type="button" @click="filterView = 'past'" class="!px-4 !py-2 text-sm font-medium !rounded-lg"
              :class="filterView === 'past' ? '!bg-[#b78026] !text-white' : '!bg-gray-100 !text-gray-700 hover:!bg-gray-200'"
              :full-width="false">
              往期活动
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button v-if="isLoggedIn" @click="showCreateModal = true" variant="primary" :full-width="false"
        customClass="p-3 rounded-xl mb-4">
        <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        创建活动
      </Button>

      <EventList :events="displayedEvents" :loading="loading" :error-message="errorMessage" empty-message="还没有创建任何活动"
        :columns="3">
        <template v-if="errorMessage" #error-actions>
          <Button @click="loadEvents" variant="primary" class="mt-4" :full-width="false">
            <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            刷新
          </Button>
        </template>
      </EventList>
    </div>

    <EventModal :is-open="showCreateModal" @close="showCreateModal = false" @submit="handleCreateEvent" />
  </div>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import Button from '~/components/form/Button.vue'
import EventList from '~/components/event/EventList.vue'
import EventModal from '~/components/event/EventModal.vue'
import { get, post } from '~/utils/http'
import { useUser } from '~/composables/useAuth'
import { SITE_NAME } from '~/constants'

const router = useRouter()
const { isLoggedIn } = useUser()

const loading = ref(false)
const errorMessage = ref('')
const events = ref<any[]>([])
const showCreateModal = ref(false)
const filterView = ref<'all' | 'upcoming' | 'past'>('all')

const displayedEvents = computed(() => {
  const now = new Date()

  switch (filterView.value) {
    case 'upcoming':
      return events.value.filter(event => new Date(event.date) >= now)
    case 'past':
      return events.value.filter(event => new Date(event.date) < now)
    default:
      return events.value
  }
})

const loadEvents = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await get('/api/events')
    if (response.success) {
      events.value = response.events
    }
  } catch (error: any) {
    errorMessage.value = '加载活动失败'
  } finally {
    loading.value = false
  }
}

const handleCreateEvent = async (eventId: string | null, data: any) => {
  try {
    const response = await post('/api/events', data)

    if (response.success && response.event) {
      showCreateModal.value = false
      router.push(`/events/${response.event._id}`)
    }
  } catch (error: any) {
    throw error
  }
}

onMounted(() => {
  loadEvents()
})

useHead({
  title: `活动 - ${SITE_NAME}`,
  meta: [
    { name: 'description', content: `查看${SITE_NAME}的所有活动。` },
    { name: 'keywords', content: `${SITE_NAME}, 加拿大, 活动, 聚会` },
    { property: 'og:title', content: `活动 - ${SITE_NAME}` },
    { property: 'og:description', content: `查看${SITE_NAME}的所有活动` },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
