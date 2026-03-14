<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">创建活动</h2>
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
        <Input
          id="address"
          v-model="form.address"
          label="活动地址"
          placeholder="请输入活动地址"
        />
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
            loading-text="创建中..."
          >
            创建活动
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import Textarea from '~/components/form/Textarea.vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: any): void
}>()

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

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    emit('submit', {
      ...form.value,
      date: new Date(form.value.date)
    })
  } catch (error: any) {
    errorMessage.value = error.data?.message || '创建活动失败'
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  form.value = {
    tl: '',
    desc: '',
    date: '',
    address: '',
    city: '',
    status: 'draft'
  }
  errorMessage.value = ''
  successMessage.value = ''
}

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script>
