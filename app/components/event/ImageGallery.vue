<template>
  <div v-if="media.length > 0">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">活动照片</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="item in media"
        :key="item._id"
        class="relative group aspect-square rounded-lg overflow-hidden cursor-pointer"
        @click="openLightbox(indexOf(item))"
      >
        <img :src="item.thumb || item.src" :alt="item.src" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
        <div v-if="canDelete" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            type="button"
            variant="danger"
            @click.stop="handleDelete(item)"
            class="!p-2 !rounded-full shadow-lg"
            :full-width="false"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      @click="closeLightbox"
    >
      <Button
        type="button"
        variant="secondary"
        @click.stop="prevImage"
        class="absolute left-4 !p-2 !bg-transparent !border-0 text-white hover:!text-gray-300"
        :class="{ 'opacity-50': currentIndex === 0 }"
        :full-width="false"
        :disabled="currentIndex === 0"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </Button>
      <img
        :src="currentImage?.src"
        class="max-w-[90vw] max-h-[90vh] object-contain"
        @click.stop
      />
      <Button
        type="button"
        variant="secondary"
        @click.stop="nextImage"
        class="absolute right-4 !p-2 !bg-transparent !border-0 text-white hover:!text-gray-300"
        :class="{ 'opacity-50': currentIndex === media.length - 1 }"
        :full-width="false"
        :disabled="currentIndex === media.length - 1"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </Button>
      <Button
        type="button"
        variant="secondary"
        @click="closeLightbox"
        class="absolute top-4 right-4 !p-2 !bg-transparent !border-0 text-white hover:!text-gray-300"
        :full-width="false"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '~/components/form/Button.vue'

interface MediaItem {
  _id: string
  src: string
  thumb: string
  ts: string
}

interface Props {
  media: MediaItem[]
  canDelete?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  canDelete: false
})

const emit = defineEmits<{
  (e: 'delete', item: MediaItem): void
}>()

const lightboxOpen = ref(false)
const currentIndex = ref(0)

const currentImage = computed(() => {
  return props.media[currentIndex.value]
})

const indexOf = (item: MediaItem) => {
  return props.media.findIndex(m => m._id === item._id)
}

const openLightbox = (index: number) => {
  currentIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextImage = () => {
  if (currentIndex.value < props.media.length - 1) {
    currentIndex.value++
  }
}

const handleDelete = async (item: MediaItem) => {
  if (confirm('确定要删除这张图片吗？')) {
    emit('delete', item)
  }
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!lightboxOpen.value) return

  switch (e.key) {
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'Escape':
      closeLightbox()
      break
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>
