<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">登录</h1>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <Input
            id="email"
            v-model="form.email"
            label="邮箱地址"
            type="email"
            placeholder="请输入邮箱地址"
            required
          />

          <Input
            id="password"
            v-model="form.password"
            label="密码"
            type="password"
            placeholder="请输入密码"
            required
          />

          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <Button
            type="submit"
            :loading="loading"
            loading-text="登录中..."
          >
            登录
          </Button>
        </form>

        <!-- Signup Link -->
        <p class="mt-6 text-center text-gray-600">
          还没有账号？
          <LinkButton to="/signup" variant="text-primary">
            立即注册
          </LinkButton>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import LinkButton from '~/components/form/LinkButton.vue'
import { post } from '~/utils/http'
import { initAuth } from '~/composables/useAuth'

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await post('/api/auth/login', form.value)

    if (response.success) {
      // Store token
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.user._id)

      errorMessage.value = '登录成功！正在跳转...'

      // Re-initialize auth state
      await initAuth()

      setTimeout(() => {
        navigateTo('/profile')
      }, 1000)
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || '登录失败，请检查邮箱和密码'
  } finally {
    loading.value = false
  }
}

useHead({
  title: '登录 - 广州二中加拿大生活',
  meta: [
    { name: 'description', content: '登录广州二中加拿大生活社区账号，参与校友活动，建立联系。' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
