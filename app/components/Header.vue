<template>
  <header class="bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-xl font-bold text-blue-600 hover:text-blue-700">
          广州二中加拿大生活
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
            首页
          </NuxtLink>
          <NuxtLink to="/about-us" class="text-gray-700 hover:text-blue-600 transition-colors">
            关于我们
          </NuxtLink>
          <NuxtLink to="/events" class="text-gray-700 hover:text-blue-600 transition-colors">
            活动
          </NuxtLink>
          <NuxtLink to="/login" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            登录
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <button @click="isOpen = !isOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="isOpen" class="md:hidden pb-4">
        <div class="flex flex-col space-y-3">
          <NuxtLink @click="isOpen = false" to="/" class="text-gray-700 hover:text-blue-600 transition-colors">
            首页
          </NuxtLink>
          <NuxtLink @click="isOpen = false" to="/about-us" class="text-gray-700 hover:text-blue-600 transition-colors">
            关于我们
          </NuxtLink>
          <NuxtLink @click="isOpen = false" to="/events" class="text-gray-700 hover:text-blue-600 transition-colors">
            活动
          </NuxtLink>
          <NuxtLink @click="isOpen = false" to="/login" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center">
            登录
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>
