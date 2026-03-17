<template>
  <div class="min-h-screen bg-[#11817b] py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <EventDetailLoading v-if="loading" />

      <!-- Error State -->
      <EventDetailError v-else-if="errorMessage" :message="errorMessage" />

      <!-- Event Detail -->
      <div v-else-if="event">
        <!-- Back Button -->
        <EventDetailBackButton />

        <!-- Event Header -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-8 border-b">
            <EventDetailHeader :event="event" :is-owner="isOwner" @edit="handleEdit" />
          </div>

          <!-- Event Body -->
          <div class="p-8">
            <!-- Description -->
            <EventDetailDescription :event="event" />

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

            <hr v-if="isOwner" class="my-8 border-gray-200">

            <!-- Image Upload (for owner) -->
            <EventDetailMedia v-if="isOwner" @upload="handleImageUpload" />
          </div>
        </div>

        <!-- Image Gallery -->
        <EventDetailGallery :media="media" :can-delete="isOwner" @delete="handleDeleteImage" />
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
import { useRoute } from 'vue-router'
import EventInfo from '~/components/event/EventInfo.vue'
import EventOrganizer from '~/components/event/EventOrganizer.vue'
import EventModal from '~/components/event/EventModal.vue'
import EventDetailLoading from '~/components/event/EventDetailLoading.vue'
import EventDetailError from '~/components/event/EventDetailError.vue'
import EventDetailHeader from '~/components/event/EventDetailHeader.vue'
import EventDetailDescription from '~/components/event/EventDetailDescription.vue'
import EventDetailMedia from '~/components/event/EventDetailMedia.vue'
import EventDetailGallery from '~/components/event/EventDetailGallery.vue'
import EventDetailBackButton from '~/components/event/EventDetailBackButton.vue'
import { get, post, del, put } from '~/utils/http'
import { useUser } from '~/composables/useAuth'

const route = useRoute()
const { user: currentUser } = useUser()

const event = ref<any>(null)
const organizer = ref<any>(null)
const media = ref<any[]>([])
const loading = ref(false)
const mediaLoading = ref(false)
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
      media.value = response.medias
    } else {
      errorMessage.value = response.message || '加载活动失败'
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || '加载活动失败'
  } finally {
    loading.value = false
  }
}

const loadMedia = async () => {
  mediaLoading.value = true

  try {
    const response = await get(`/api/events/${route.params.id}/media`)
    if (response.success) {
      media.value = response.media
    }
  } catch (error: any) {
    console.error('Failed to load media:', error)
  } finally {
    mediaLoading.value = false
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

const handleImageUpload = async (files: File[]) => {
  try {
    // Convert files to base64 for upload
    const base64Files = await Promise.all(
      files.map(async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => {
            resolve({
              name: file.name,
              type: file.type,
              size: file.size,
              base64: (reader.result as string).split(',')[1]
            })
          }
          reader.readAsDataURL(file)
        })
      })
    )

    await post('/api/media/upload', {
      eventId: event.value._id,
      files: base64Files
    })

    // Reload media list
    loadMedia()
  } catch (error: any) {
    console.error('Upload failed:', error)
    alert('上传失败: ' + (error.data?.message || error.message || '未知错误'))
  }
}

const handleDeleteImage = async (item: any) => {
  try {
    await del(`/api/media/${item._id}`)
    loadMedia()
  } catch (error: any) {
    console.error('Delete failed:', error)
    alert('删除失败: ' + (error.data?.message || error.message || '未知错误'))
  }
}

onMounted(() => {
  loadEvent()
})

const eventTitle = computed(() => event.value?.tl || '活动详情')

useHead({
  title: computed(() => `${eventTitle.value} - 广州二中加拿大生活`),
  meta: computed(() => [
    { name: 'description', content: event.value?.desc || '查看此活动的详细信息' },
    { name: 'keywords', content: `广州二中, 加拿大, 活动, ${event.value?.tl || ''}` },
    { property: 'og:title', content: eventTitle.value },
    { property: 'og:description', content: event.value?.desc || '查看此活动的详细信息' },
    { property: 'og:type', content: 'website' }
  ])
})
</script>
