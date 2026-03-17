<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">我的活动</h2>
        <p class="text-gray-600 mt-1">管理您创建的所有活动</p>
      </div>
      <Button @click="$emit('createEvent')" variant="secondary">
        <svg class="w-5 h-5 inline-block mr-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        创建新活动
      </Button>
    </div>

    <EventList
      :events="events"
      :loading="loading"
      :error-message="errorMessage"
      empty-message="您还没有创建任何活动"
      :columns="2"
      :show-actions="true"
      :show-status="true"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '~/components/form/Button.vue'
import EventList from '~/components/event/EventList.vue'

interface Props {
  events: any[]
  loading: boolean
  errorMessage?: string
}

defineProps<Props>()

defineEmits<{
  createEvent: []
  edit: [event: any]
  delete: [event: any]
}>()
</script>
