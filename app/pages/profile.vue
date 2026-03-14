<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
    <div class="max-w-2xl mx-auto px-4">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import Textarea from '~/components/form/Textarea.vue'

const form = ref({
  fn: '',
  ln: '',
  graduationYear: '',
  location: '',
  bio: ''
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Load existing profile
const loadProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      errorMessage.value = '请先登录'
      navigateTo('/login')
      return
    }

    const response = await $fetch('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.success && response.user) {
      form.value.fn = response.user.fn || ''
      form.value.ln = response.user.ln || ''
      form.value.graduationYear = response.user.graduationYear || ''
      form.value.location = response.user.location || ''
      form.value.bio = response.user.bio || ''
    }
  } catch (error: any) {
    errorMessage.value = '加载个人资料失败'
  }
}

const handleUpdateProfile = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      errorMessage.value = '请先登录'
      navigateTo('/login')
      return
    }

    const response = await $fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form.value
    })

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

onMounted(() => {
  loadProfile()
})
</script>
