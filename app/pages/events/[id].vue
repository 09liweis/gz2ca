<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">加载中...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p class="text-red-600">{{ errorMessage }}</p>
        <Button @click="$router.push('/events')" variant="secondary" class="mt-4">
          返回活动列表
        </Button>
      </div>

      <!-- Event Detail -->
      <div v-else-if="event">
        <!-- Back Button -->
        <button
          @click="$router.push('/events')"
          class="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          返回活动列表
        </button>

        <!-- Event Header -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-8 border-b">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ event.tl }}</h1>
                <span
                  :class="[
                    'inline-block px-3 py-1 rounded-full text-sm font-medium',
                    event.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ event.status === 'published' ? '已发布' : '草稿' }}
                </span>
              </div>
              <div v-if="isOwner">
                <Button
                  @click="handleEdit"
                  variant="secondary"
                  size="sm"
                >
                  编辑活动
                </Button>
              </div>
            </div>
          </div>

          <!-- Event Body -->
          <div class="p-8">
            <!-- Description -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">活动描述</h2>
              <div class="prose prose-blue max-w-none text-gray-700 whitespace-pre-line">
                {{ event.desc || '暂无描述' }}
              </div>
            </div>

            <hr class="my-8 border-gray-200">

            <!-- Event Info -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">活动信息</h2>
              <EventInfo :event="event" />
            </div>

            <hr class="my-8 border-gray-200">

            <!-- Organizer -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">组织者</h2>
              <EventOrganizer :organizer="organizer" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Event Modal -->
    <EventModal
      v-if="isOwner"
      :is-open="showEditModal"
      :event-data="event"
      @close="showEditModal = false"
      @submit="handleUpdateEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '~/components/form/Button.vue'
import EventInfo from '~/components/event/EventInfo.vue'
import EventOrganizer from '~/components/event/EventOrganizer.vue'
import EventModal from '~/components/event/EventModal.vue'
import { get, put } from '~/utils/http'
import { useUser } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { user: currentUser } = useUser()

const event = ref<any>(null)
const organizer = ref<any>(null)
const loading = ref(false)
const errorMessage = ref('')
const showEditModal = ref(false)

const isOwner = computed(() => {
  return currentUser.value && event.value && currentUser.value._id === event.value.user_id
})

const loadEvent = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await get(`/api/events/${route.params.id}`)
    if (response.success) {
      event.value = response.event
      organizer.value = response.organizer
    } else {
      errorMessage.value = response.message || '加载活动失败'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || '加载活动失败'
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
  showEditModal.value = true
}

const handleUpdateEvent = async (eventId: string | null, data: any) => {
  try {
    await put(`/api/events/${event.value._id}`, data)
    showEditModal.value = false
    loadEvent()
  } catch (error: any) {
    throw error
  }
}

onMounted(() => {
  loadEvent()
})
</script>
