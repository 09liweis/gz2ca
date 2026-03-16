<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div class="bg-[#11817b] px-8 py-6">
        <h2 class="text-2xl font-bold text-white">编辑个人资料</h2>
        <p class="text-blue-100 mt-1">完善您的个人信息，让校友更好地了解您</p>
      </div>

      <form @submit.prevent="$emit('submit')" class="p-8 space-y-6">
        <!-- Basic Info Section -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 pb-3 border-b">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">基本信息</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="firstName"
              :model-value="form.fn"
              @update:model-value="$emit('update:fn', $event)"
              label="名"
              placeholder="请输入名"
              required
            />
            <Input
              id="lastName"
              :model-value="form.ln"
              @update:model-value="$emit('update:ln', $event)"
              label="姓"
              placeholder="请输入姓"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="graduationYear"
              :model-value="form.graduationYear"
              @update:model-value="$emit('update:graduationYear', $event)"
              label="毕业年份"
              type="number"
              :min="1950"
              :max="new Date().getFullYear()"
              placeholder="请输入毕业年份"
            />

            <Input
              id="location"
              :model-value="form.location"
              @update:model-value="$emit('update:location', $event)"
              label="当前所在地"
              placeholder="如：多伦多、温哥华"
            />
          </div>
        </div>

        <!-- About Section -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 pb-3 border-b">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">个人简介</h3>
          </div>

          <Textarea
            id="bio"
            :model-value="form.bio"
            @update:model-value="$emit('update:bio', $event)"
            label="关于我"
            placeholder="介绍一下自己，分享您的故事、兴趣爱好、工作经历等..."
            :rows="6"
          />
        </div>

        <!-- Messages -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-red-600 text-sm font-medium">{{ errorMessage }}</p>
          </div>
        </div>

        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-green-600 text-sm font-medium">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="submit"
            :loading="loading"
            loading-text="保存中..."
            class="px-8"
          >
            <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            保存更改
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '~/components/form/Input.vue'
import Button from '~/components/form/Button.vue'
import Textarea from '~/components/form/Textarea.vue'

interface ProfileForm {
  fn: string
  ln: string
  graduationYear: string
  location: string
  bio: string
}

interface Props {
  form: ProfileForm
  loading: boolean
  errorMessage?: string
  successMessage?: string
}

defineProps<Props>()

defineEmits<{
  'update:fn': [value: string]
  'update:ln': [value: string]
  'update:graduationYear': [value: string]
  'update:location': [value: string]
  'update:bio': [value: string]
  submit: []
}>()
</script>
