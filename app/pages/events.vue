<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">活动</h1>
        <Button
          v-if="isLoggedIn"
          @click="showCreateModal = true"
          variant="primary"
        >
          创建活动
        </Button>
      </div>

      <EventList
        :events="events"
        :loading="loading"
        :error-message="errorMessage"
        empty-message="还没有创建任何活动"
        :columns="3"
      />
    </div>

    <CreateEventModal
      :is-open="showCreateModal"
      @close="showCreateModal = false"
      @submit="handleCreateEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '~/components/form/Button.vue'
import EventList from '~/components/event/EventList.vue'
import CreateEventModal from '~/components/event/CreateEventModal.vue'
import { get, post } from '~/utils/http'

const isLoggedIn = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const events = ref<any[]>([])
const showCreateModal = ref(false)

// Check login status
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
}

// Load events
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

// Create event
const handleCreateEvent = async (data: any) => {
  try {
    await post('/api/events', data)

    showCreateModal.value = false
    loadEvents()
  } catch (error: any) {
    throw error
  }
}

onMounted(() => {
  checkLoginStatus()
  loadEvents()
})
</script>
