<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Profile Header -->
    <ProfileHeader
      :name="userName"
      :email="globalUser?.eml || ''"
      :initials="userInitials"
      :graduation-year="form.graduationYear"
      :location="form.location"
      :events-count="myEvents.length"
    />

    <!-- Tab Navigation -->
    <ProfileTabs
      v-model:active-tab="activeTab"
      :tabs="tabs"
    />

    <!-- Content Area -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Tab -->
      <div v-show="activeTab === 'profile'">
        <ProfileForm
          :form="form"
          :loading="loading"
          :error-message="errorMessage"
          :success-message="successMessage"
          @update:fn="form.fn = $event"
          @update:ln="form.ln = $event"
          @update:graduation-year="form.graduationYear = $event"
          @update:location="form.location = $event"
          @update:bio="form.bio = $event"
          @submit="handleUpdateProfile"
        />
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'">
        <ProfileEvents
          :events="myEvents"
          :loading="eventsLoading"
          :error-message="eventsErrorMessage"
          @create-event="$router.push('/events')"
          @edit="handleEditEvent"
          @delete="handleDeleteEvent"
        />
      </div>
    </div>

    <!-- Event Modal -->
    <EventModal
      :is-open="showEditModal"
      :event-data="editingEvent"
      @close="showEditModal = false"
      @submit="handleUpdateEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProfileHeader from '~/components/profile/ProfileHeader.vue'
import ProfileTabs from '~/components/profile/ProfileTabs.vue'
import ProfileForm from '~/components/profile/ProfileForm.vue'
import ProfileEvents from '~/components/profile/ProfileEvents.vue'
import EventModal from '~/components/event/EventModal.vue'
import { get, put, del } from '~/utils/http'
import { useUser } from '~/composables/useAuth'

const ProfileIcon = () => h('svg', {
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-width': '2'
}, [
  h('path', { d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
])

const CalendarIcon = () => h('svg', {
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-width': '2'
}, [
  h('path', { d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
])

const { user: globalUser } = useUser()

const activeTab = ref<'profile' | 'events'>('profile')

const form = ref({
  fn: '',
  ln: '',
  graduationYear: '',
  location: '',
  bio: ''
})

const myEvents = ref<any[]>([])
const loading = ref(false)
const eventsLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const eventsErrorMessage = ref('')
const showEditModal = ref(false)
const editingEvent = ref<any>(null)

const tabs = [
  {
    id: 'profile',
    label: '个人资料',
    icon: ProfileIcon
  },
  {
    id: 'events',
    label: '我的活动',
    icon: CalendarIcon,
    count: myEvents.value.length
  }
]

const userName = computed(() => {
  if (form.value.fn || form.value.ln) {
    return `${form.value.ln}${form.value.fn}`.trim()
  }
  return '用户'
})

const userInitials = computed(() => {
  const fn = form.value.fn || ''
  const ln = form.value.ln || ''
  return (ln[0] || '') + (fn[0] || '') || '用'
})

// Initialize form with global user data
onMounted(() => {
  if (globalUser.value) {
    form.value.fn = globalUser.value.fn || ''
    form.value.ln = globalUser.value.ln || ''
    form.value.graduationYear = globalUser.value.graduationYear || ''
    form.value.location = globalUser.value.location || ''
    form.value.bio = globalUser.value.bio || ''
  }
  loadMyEvents()
})

// Load user's events
const loadMyEvents = async () => {
  eventsLoading.value = true
  eventsErrorMessage.value = ''

  try {
    const response = await get('/api/events/my')
    if (response.success) {
      myEvents.value = response.events
    }
  } catch (error: any) {
    eventsErrorMessage.value = '加载活动失败'
  } finally {
    eventsLoading.value = false
  }
}

const handleUpdateProfile = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await put('/api/user/profile', form.value)

    successMessage.value = '个人资料更新成功！'

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.data?.message || '更新失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const handleEditEvent = (event: any) => {
  editingEvent.value = event
  showEditModal.value = true
}

const handleUpdateEvent = async (eventId: string, data: any) => {
  try {
    await put(`/api/events/${eventId}`, data)
    showEditModal.value = false
    loadMyEvents()
  } catch (error: any) {
    throw error
  }
}

const handleDeleteEvent = async (event: any) => {
  if (!confirm('确定要删除这个活动吗？')) {
    return
  }

  try {
    await del(`/api/events/${event._id}`)
    loadMyEvents()
  } catch (error: any) {
    alert('删除失败，请稍后重试')
  }
}

useHead({
  title: '个人资料 - 广州二中加拿大生活',
  meta: [
    { name: 'description', content: '查看和管理您的个人资料，更新您在加拿大的信息。' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
