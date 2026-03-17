<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">{{ isEdit ? '编辑活动' : '创建活动' }}</h2>
      </div>
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <Input
          id="title"
          v-model="form.tl"
          label="活动标题"
          placeholder="请输入活动标题"
          required
        />
        <Textarea
          id="description"
          v-model="form.desc"
          label="活动描述"
          placeholder="请输入活动描述"
          :rows="4"
        />
        <Input
          id="date"
          v-model="form.date"
          label="活动日期"
          type="date"
          required
        />
        <div class="relative">
          <label
            for="address"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            活动地址
          </label>
          <input
            id="address"
            v-model="form.address"
            type="text"
            placeholder="请输入活动地址"
            @input="handleAddressInput"
            @focus="showSuggestions = true"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          <ul
            v-if="showSuggestions && addressSuggestions.length > 0"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            <li
              v-for="(suggestion, index) in addressSuggestions"
              :key="index"
              @click="selectAddress(suggestion)"
              class="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              {{ suggestion.name }} {{ suggestion.full_address }}
            </li>
          </ul>
        </div>
        <Input
          id="city"
          v-model="form.city"
          label="城市"
          placeholder="请输入城市"
        />
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">状态</label>
          <select
            v-model="form.status"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="draft">草稿</option>
            <option value="published">已发布</option>
          </select>
        </div>

        <div v-if="errorMessage" class="text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
        </div>

        <div class="flex gap-4">
          <Button
            type="button"
            @click="handleCancel"
            variant="secondary"
          >
            取消
          </Button>
          <Button
            type="submit"
            :loading="loading"
            :loading-text="isEdit ? '保存中...' : '创建中...'"
          >
            {{ isEdit ? '保存修改' : '创建活动' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import Textarea from '~/components/form/Textarea.vue'

interface EventData {
  _id?: string
  tl?: string
  desc?: string
  date?: string | Date
  address?: string
  city?: string
  status?: string
}

interface Props {
  isOpen: boolean
  eventData?: EventData | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', eventId: string | null, data: any): void
}>()

const isEdit = computed(() => !!props.eventData?._id)

const form = ref({
  tl: '',
  desc: '',
  date: '',
  address: '',
  city: '',
  status: 'draft'
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const addressSuggestions = ref<any[]>([])
const showSuggestions = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const mapboxToken = useRuntimeConfig().public.mapboxAccessToken || ''

const generateSessionToken = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const sessionToken = ref(generateSessionToken())

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    emit('submit', props.eventData?._id || null, {
      ...form.value,
      date: new Date(form.value.date)
    })
  } catch (error: any) {
    errorMessage.value = error.data?.message || (isEdit.value ? '更新活动失败' : '创建活动失败')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  resetForm()
  emit('close')
}

const handleAddressInput = (event: Event) => {
  const query = (event.target as HTMLInputElement).value

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  if (query.length < 2) {
    addressSuggestions.value = []
    return
  }

  debounceTimer = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(query)}&access_token=${mapboxToken}&session_token=${sessionToken.value}`
      )
      const data = await response.json()
      addressSuggestions.value = data.suggestions || []
    } catch (error) {
      console.error('Address search error:', error)
      addressSuggestions.value = []
    }
  }, 300)
}

const selectAddress = (suggestion: any) => {
  form.value.address = suggestion.full_address
  
  if (suggestion.context) {
    form.value.city = suggestion.context?.place?.name;
  }
  
  showSuggestions.value = false
  addressSuggestions.value = []
  
  sessionToken.value = generateSessionToken()
}

const resetForm = () => {
  if (!isEdit.value) {
    form.value = {
      tl: '',
      desc: '',
      date: '',
      address: '',
      city: '',
      status: 'draft'
    }
  }
  errorMessage.value = ''
  successMessage.value = ''
}

const initForm = () => {
  if (props.eventData) {
    form.value.tl = props.eventData.tl || ''
    form.value.desc = props.eventData.desc || ''
    form.value.date = props.eventData.date ? new Date(props.eventData.date).toISOString().split('T')[0] : ''
    form.value.address = props.eventData.address || ''
    form.value.city = props.eventData.city || ''
    form.value.status = props.eventData.status || 'draft'
  } else {
    form.value = {
      tl: '',
      desc: '',
      date: '',
      address: '',
      city: '',
      status: 'draft'
    }
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    initForm()
  } else {
    resetForm()
  }
})

watch(() => form.value.address, (newVal) => {
  if (!newVal || newVal.length < 2) {
    addressSuggestions.value = []
    showSuggestions.value = false
  }
})

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>
