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
        <AddressAutocomplete
          id="address"
          v-model="form.address"
          label="活动地址"
          placeholder="请输入活动地址"
          @address-selected="handleAddressSelected"
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
import AddressAutocomplete from '~/components/form/AddressAutocomplete.vue'

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
  status: 'draft'
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const selectedPlace = ref<any>(null)

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    emit('submit', props.eventData?._id || null, {
      tl: form.value.tl,
      desc: form.value.desc,
      date: new Date(form.value.date),
      place: selectedPlace.value,
      status: form.value.status
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

const handleAddressSelected = (suggestion: any) => {
  selectedPlace.value = suggestion
}

const resetForm = () => {
  if (!isEdit.value) {
    form.value = {
      tl: '',
      desc: '',
      date: '',
      address: '',
      status: 'draft'
    }
    selectedPlace.value = null
  }
  errorMessage.value = ''
  successMessage.value = ''
}

const initForm = () => {
  if (props.eventData) {
    form.value.tl = props.eventData.tl || ''
    form.value.desc = props.eventData.desc || ''
    form.value.date = props.eventData.date ? new Date(props.eventData.date).toISOString().split('T')[0] : ''
    form.value.address = props.eventData.place_id?.full_address || ''
    form.value.status = props.eventData.status || 'draft'
    
    if (props.eventData.place_id) {
      selectedPlace.value = {
        mapbox_id: props.eventData.place_id.mapbox_id,
        name: props.eventData.place_id.name,
        full_address: props.eventData.place_id.full_address,
        context: props.eventData.place_id.context,
        coordinates: props.eventData.place_id.coordinates
      }
    }
  } else {
    form.value = {
      tl: '',
      desc: '',
      date: '',
      address: '',
      status: 'draft'
    }
    selectedPlace.value = null
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    initForm()
  } else {
    resetForm()
  }
})
</script>
