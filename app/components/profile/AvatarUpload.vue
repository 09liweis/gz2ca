<template>
  <div class="relative">
    <!-- Avatar Display -->
    <div class="relative group cursor-pointer" @click="triggerFileInput">
      <div
        class="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all group-hover:border-white/50"
      >
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          :alt="userName"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-5xl font-bold text-white">
          {{ initials }}
        </span>
      </div>

      <!-- Upload Overlay -->
      <div class="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <!-- Loading Spinner -->
      <div v-if="uploading" class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- Remove Avatar Button -->
    <button
      v-if="avatarUrl && !uploading"
      @click.stop="handleRemoveAvatar"
      class="absolute -bottom-1 -right-1 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
      title="删除头像"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { post, del } from '~/utils/http'
import { useUser } from '~/composables/useAuth'

interface Props {
  avatarUrl?: string
  userName: string
  initials: string
}

const props = defineProps<Props>()


const emit = defineEmits<{
  'update:avatarUrl': [url: string | undefined]
  error: [message: string]
}>()

const { updateUser } = useUser()
const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    emit('error', '只支持图片格式 (JPEG, PNG, GIF, WebP)')
    return
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    emit('error', '图片大小不能超过 5MB')
    return
  }

  // Upload file
  uploading.value = true

  try {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await post('/api/user/avatar', formData, true)

    if (response.success && response.user) {
      emit('update:avatarUrl', response.user.avt)
      // Update global user state
      updateUser(response.user)
    }
  } catch (error: any) {
    emit('error', error.message || '上传失败，请稍后重试')
  } finally {
    uploading.value = false
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const handleRemoveAvatar = async () => {
  if (!confirm('确定要删除头像吗？')) {
    return
  }

  try {
    const response = await del('/api/user/avatar')
    emit('update:avatarUrl', undefined)
    // Update global user state
    if (response.user) {
      updateUser(response.user)
    }
  } catch (error: any) {
    emit('error', '删除失败，请稍后重试')
  }
}
</script>
