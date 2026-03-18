<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div
            class="w-10 h-10 bg-[#11817b] rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
            <span class="text-white font-bold text-lg">广</span>
          </div>
          <span class="font-semibold text-gray-900 hidden sm:inline">{{ SITE_NAME }}</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <LinkButton
            v-for="menu in navigationMenus"
            :key="menu.to"
            :to="menu.to"
            variant="text-primary"
            :class="[
              '!px-3 !py-2 !rounded-none relative group',
              isActiveRoute(menu.to)
                ? '!text-primary font-semibold'
                : '!text-gray-700 hover:!text-primary'
            ]"
          >
            {{ menu.label }}
            <span
              :class="[
                'absolute bottom-0 left-0 h-0.5 bg-[#11817b] transition-all duration-300',
                isActiveRoute(menu.to) ? 'w-full' : 'w-0 group-hover:w-full'
              ]"></span>
          </LinkButton>
        </div>

        <!-- Auth Section Desktop -->
        <div class="hidden md:flex items-center gap-4">
          <template v-if="isLoggedIn">
            <LinkButton to="/profile" variant="text-primary" class="!px-3 !text-gray-700">
              {{ userName }}
            </LinkButton>
            <div class="w-px h-6 bg-gray-200"></div>
            <Button type="button" @click="handleLogout" variant="danger">
              登出
            </Button>
          </template>
          <template v-else>
            <LinkButton to="/login" variant="primary" class="!px-6 !py-2.5">
              登录
            </LinkButton>
          </template>
        </div>

        <!-- Mobile menu button -->
        <Button
          type="button"
          variant="secondary"
          @click="isOpen = !isOpen"
          class="md:hidden !p-2 !border-0 !bg-transparent !rounded-lg hover:!bg-gray-100 !text-gray-900"
          :full-width="false"
        >
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <!-- Mobile menu -->
      <div v-if="isOpen"
        class="md:hidden pb-4 border-t border-gray-200 pt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
        <LinkButton
          v-for="menu in navigationMenus"
          :key="menu.to"
          @click="handleMobileMenuClick"
          :to="menu.to"
          variant="text-primary"
          :class="[
            '!block !px-4 !py-2 rounded-lg',
            isActiveRoute(menu.to)
              ? '!text-[#11817b] !bg-[#11817b]/10 font-semibold'
              : '!text-gray-700 hover:!bg-[#11817b]/10'
          ]"
        >
          {{ menu.label }}
        </LinkButton>

        <!-- Mobile Auth Section -->
        <div class="border-t border-gray-200 pt-3">
          <template v-if="isLoggedIn">
            <LinkButton @click="handleMobileMenuClick" to="/profile" variant="text-primary" class="!block !px-4 !py-2 !text-gray-700 hover:!bg-primary/10 rounded-lg">
              {{ userName }}
            </LinkButton>
            <Button type="button" @click="handleLogout" variant="danger">
              登出
            </Button>
          </template>
          <template v-else>
            <LinkButton @click="handleMobileMenuClick" to="/login" variant="primary" class="!block !px-4 !py-2.5">
              登录
            </LinkButton>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUser } from '~/composables/useAuth'
import { SITE_NAME } from '~/constants'
import Button from '~/components/form/Button.vue'
import LinkButton from '~/components/form/LinkButton.vue'

const route = useRoute()
const { isLoggedIn, userName, logout } = useUser()
const isOpen = ref(false)

const navigationMenus = computed(() => [
  { label: '活动', to: '/' }
])

const isActiveRoute = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  logout()
  isOpen.value = false
}

const handleMobileMenuClick = () => {
  isOpen.value = false
}
</script>
