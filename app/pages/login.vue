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

        <!-- Google Login Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-sm text-gray-500">或</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

        <!-- Google Login Button -->
        <button
          type="button"
          @click="handleGoogleLogin"
          :disabled="googleLoading"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span class="text-gray-700 font-medium">{{ googleLoading ? '登录中...' : '使用 Google 登录' }}</span>
        </button>

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
const googleLoading = ref(false)
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

const handleGoogleLogin = async () => {
  googleLoading.value = true
  errorMessage.value = ''

  try {
    // Load Google Identity Services
    if (!window.google) {
      await new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = resolve
        document.head.appendChild(script)
      })
    }

    // Initialize Google Sign-In using ID Token flow
    const client = window.google.accounts.oauth2.initCodeClient({
      client_id: useRuntimeConfig().public.googleClientId,
      scope: 'email profile',
      callback: async (response: any) => {
        try {
          if (response.code) {
            // Exchange authorization code for tokens on the server
            const loginResponse = await post('/api/auth/google', {
              code: response.code
            })

            if (loginResponse.success) {
              localStorage.setItem('token', loginResponse.token)
              localStorage.setItem('userId', loginResponse.user._id)

              errorMessage.value = '登录成功！正在跳转...'
              await initAuth()

              setTimeout(() => {
                navigateTo('/profile')
              }, 1000)
            }
          }
        } catch (error: any) {
          errorMessage.value = error.data?.message || 'Google 登录失败'
        } finally {
          googleLoading.value = false
        }
      },
      error_callback: (error: any) => {
        console.error('Google auth error:', error)
        errorMessage.value = 'Google 登录失败，请重试'
        googleLoading.value = false
      }
    })

    client.requestCode()
  } catch (error: any) {
    errorMessage.value = 'Google 登录初始化失败'
    googleLoading.value = false
  }
}

useHead({
  title: '登录 - 广州人在加拿大',
  meta: [
    { name: 'description', content: '登录广州人在加拿大社区账号。' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>
