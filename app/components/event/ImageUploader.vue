<template>
  <div>
    <div
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
      :class="{ 'border-blue-500 bg-blue-50': isDragging }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="mt-2 text-sm text-gray-600">
        <span class="text-blue-600 font-medium">点击上传</span> 或拖拽图片到此处
      </p>
      <p class="mt-1 text-xs text-gray-500">支持 JPG, PNG, GIF 格式</p>
    </div>

    <!-- Image Preview -->
    <div v-if="previewImages.length > 0" class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="(image, index) in previewImages" :key="index" class="relative group">
        <img :src="image.preview" class="w-full h-32 object-cover rounded-lg shadow" />
        <Button
          type="button"
          variant="danger"
          @click.stop="removeImage(index)"
          class="absolute top-1 right-1 !w-6 !h-6 !p-0 !rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          :full-width="false"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
        <div v-if="image.uploading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/form/Button.vue'

interface PreviewImage {
  file: File
  preview: string
  uploading?: boolean
  uploaded?: boolean
  id?: string
}

interface Props {
  modelValue?: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'upload', files: File[]): void
  (e: 'remove', imageId: string): void
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const previewImages = ref<PreviewImage[]>([])

const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = Array.from(e.dataTransfer?.files || []).filter(file => file.type.startsWith('image/'))

  if (files.length > 0) {
    processFiles(files)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length > 0) {
    processFiles(files)
  }

  // Reset input value to allow selecting same files again
  target.value = ''
}

const processFiles = (files: File[]) => {
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImages.value.push({
        file,
        preview: e.target?.result as string,
        uploading: false
      })
    }
    reader.readAsDataURL(file)
  })
  emit('upload', files)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const removeImage = (index: number) => {
  const image = previewImages.value[index]
  if (image.id) {
    emit('remove', image.id)
  }
  previewImages.value.splice(index, 1)
}

const markAsUploading = (index: number) => {
  if (previewImages.value[index]) {
    previewImages.value[index].uploading = true
  }
}

const markAsUploaded = (index: number, id: string) => {
  if (previewImages.value[index]) {
    previewImages.value[index].uploading = false
    previewImages.value[index].uploaded = true
    previewImages.value[index].id = id
  }
}

const clearAll = () => {
  previewImages.value = []
}

defineExpose({
  markAsUploading,
  markAsUploaded,
  clearAll
})
</script>
