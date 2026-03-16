<template>
  <div class="bg-[#11817b] text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <!-- Avatar -->
        <AvatarUpload
          :avatar-url="avatarUrl"
          :user-name="name"
          :initials="initials"
          @update:avatar-url="$emit('update:avatarUrl', $event)"
          @error="$emit('error', $event)"
        />

        <!-- User Info -->
        <div class="flex-1 text-center sm:text-left">
          <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ name }}</h1>
          <p class="text-blue-100 text-lg mb-3">{{ email }}</p>
          <div class="flex flex-wrap gap-3 justify-center sm:justify-start">
            <div v-if="graduationYear" class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span class="font-medium">{{ graduationYear }} 届</span>
            </div>
            <div v-if="location" class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="font-medium">{{ location }}</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold">{{ eventsCount }}</div>
            <div class="text-blue-100 text-sm">活动</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUpload from '~/components/profile/AvatarUpload.vue'

interface Props {
  avatarUrl?: string
  name: string
  email: string
  initials: string
  graduationYear?: string
  location?: string
  eventsCount: number
}

defineProps<Props>()

defineEmits<{
  'update:avatarUrl': [url: string | undefined]
  error: [message: string]
}>()
</script>
