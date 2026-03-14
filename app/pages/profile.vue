<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Profile Header -->
    <div class="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <!-- Avatar -->
          <div class="relative">
            <div class="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-5xl font-bold border-4 border-white/30 shadow-2xl">
              {{ userInitials }}
            </div>
            <div class="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center sm:text-left">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ userName }}</h1>
            <p class="text-blue-100 text-lg mb-3">{{ globalUser?.eml }}</p>
            <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
              <div v-if="form.graduationYear" class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span class="font-medium">{{ form.graduationYear }} 届</span>
              </div>
              <div v-if="form.location" class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="font-medium">{{ form.location }}</span>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="flex gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold">{{ myEvents.length }}</div>
              <div class="text-blue-100 text-sm">活动</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white border-b shadow-sm sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex gap-8">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'py-4 px-2 border-b-2 font-medium text-sm transition-colors relative',
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            个人资料
          </button>
          <button
            @click="activeTab = 'events'"
            :class="[
              'py-4 px-2 border-b-2 font-medium text-sm transition-colors relative',
              activeTab === 'events'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            我的活动
            <span v-if="myEvents.length > 0" class="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
              {{ myEvents.length }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Content Area -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Tab -->
      <div v-show="activeTab === 'profile'" class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6">
            <h2 class="text-2xl font-bold text-white">编辑个人资料</h2>
            <p class="text-blue-100 mt-1">完善您的个人信息，让校友更好地了解您</p>
          </div>

          <form @submit.prevent="handleUpdateProfile" class="p-8 space-y-6">
            <!-- Basic Info Section -->
            <div class="space-y-6">
              <div class="flex items-center gap-3 pb-3 border-b">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">基本信息</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="firstName"
                  v-model="form.fn"
                  label="名"
                  placeholder="请输入名"
                  required
                />
                <Input
                  id="lastName"
                  v-model="form.ln"
                  label="姓"
                  placeholder="请输入姓"
                  required
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="graduationYear"
                  v-model="form.graduationYear"
                  label="毕业年份"
                  type="number"
                  :min="1950"
                  :max="new Date().getFullYear()"
                  placeholder="请输入毕业年份"
                />

                <Input
                  id="location"
                  v-model="form.location"
                  label="当前所在地"
                  placeholder="如：多伦多、温哥华"
                />
              </div>
            </div>

            <!-- About Section -->
            <div class="space-y-6">
              <div class="flex items-center gap-3 pb-3 border-b">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">个人简介</h3>
              </div>

              <Textarea
                id="bio"
                v-model="form.bio"
                label="关于我"
                placeholder="介绍一下自己，分享您的故事、兴趣爱好、工作经历等..."
                :rows="6"
              />
            </div>

            <!-- Messages -->
            <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-red-600 text-sm font-medium">{{ errorMessage }}</p>
              </div>
            </div>

            <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-green-600 text-sm font-medium">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="submit"
                :loading="loading"
                loading-text="保存中..."
                class="px-8"
              >
                <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                保存更改
              </Button>
            </div>
          </form>
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'">
        <div class="mb-6 flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">我的活动</h2>
            <p class="text-gray-600 mt-1">管理您创建的所有活动</p>
          </div>
          <Button @click="$router.push('/events')" variant="secondary">
            <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            创建新活动
          </Button>
        </div>

        <EventList
          :events="myEvents"
          :loading="eventsLoading"
          :error-message="eventsErrorMessage"
          empty-message="您还没有创建任何活动"
          :columns="2"
          :show-actions="true"
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
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import Textarea from '~/components/form/Textarea.vue'
import EventList from '~/components/event/EventList.vue'
import EventModal from '~/components/event/EventModal.vue'
import { get, put, del } from '~/utils/http'
import { useUser } from '~/composables/useAuth'

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
</script>
