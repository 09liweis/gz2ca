<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <span class="text-white font-bold text-lg">G</span>
          </div>
          <span class="font-semibold text-gray-900 hidden sm:inline">广州二中加拿大</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink to="/" class="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group">
            首页
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink to="/about-us" class="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group">
            关于我们
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
          <NuxtLink to="/events" class="px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group">
            活动
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </NuxtLink>
        </div>

        <!-- Auth Section Desktop -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="isLoggedIn">
            <div class="flex items-center space-x-4">
              <NuxtLink to="/profile" class="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                {{ userName }}
              </NuxtLink>
              <div class="w-px h-6 bg-gray-200"></div>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium"
              >
                退出
              </button>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transform hover:scale-105 transition-all duration-200 font-medium">
              登录
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button @click="isOpen = !isOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg v-if="!isOpen" class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="isOpen" class="md:hidden pb-4 border-t border-gray-200 pt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
        <NuxtLink @click="isOpen = false" to="/" class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
          首页
        </NuxtLink>
        <NuxtLink @click="isOpen = false" to="/about-us" class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
          关于我们
        </NuxtLink>
        <NuxtLink @click="isOpen = false" to="/events" class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
          活动
        </NuxtLink>

        <!-- Mobile Auth Section -->
        <div class="border-t border-gray-200 pt-3">
          <template v-if="isLoggedIn">
            <NuxtLink @click="isOpen = false" to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium">
              {{ userName }}
            </NuxtLink>
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors font-medium mt-2"
            >
              退出
            </button>
          </template>
          <template v-else>
            <NuxtLink @click="isOpen = false" to="/login" class="block px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-medium text-center">
              登录
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUser } from '~/composables/useAuth'

const { isLoggedIn, userName, initAuth, logout } = useUser()
const isOpen = ref(false)

const handleLogout = () => {
  logout()
  isOpen.value = false
}

onMounted(() => {
  initAuth()
})
</script>
