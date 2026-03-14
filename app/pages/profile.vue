<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Profile Form -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">完善个人资料</h1>

          <form @submit.prevent="handleUpdateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="请输入当前所在地（如：多伦多、温哥华）"
            />

            <Textarea
              id="bio"
              v-model="form.bio"
              label="个人简介"
              placeholder="请介绍一下自己..."
              :rows="4"
            />

            <!-- Error Message -->
            <div v-if="errorMessage" class="text-red-600 text-sm text-center">
              {{ errorMessage }}
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="text-green-600 text-sm text-center">
              {{ successMessage }}
            </div>

            <Button
              type="submit"
              :loading="loading"
              loading-text="保存中..."
            >
              保存资料
            </Button>
          </form>
        </div>

        <!-- My Events -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">我的活动</h2>
          <EventList
            :events="myEvents"
            :loading="eventsLoading"
            :error-message="eventsErrorMessage"
            empty-message="您还没有创建任何活动"
            :columns="1"
            :show-actions="true"
            @edit="handleEditEvent"
            @delete="handleDeleteEvent"
          />
        </div>
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
