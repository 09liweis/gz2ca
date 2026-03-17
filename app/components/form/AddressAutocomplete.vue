<template>
  <div class="relative">
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      :required="required"
      @input="handleInput"
      @focus="showSuggestions = true"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    />
    <ul
      v-if="showSuggestions && suggestions.length > 0"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectAddress(suggestion)"
        class="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
      >
        {{suggestion.name}} {{ suggestion.full_address }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'

interface AddressSuggestion {
  mapbox_id?: string
  name?: string
  full_address?: string
  context?: {
    place?: {
      name?: string
    }
    region?: {
      name?: string
    }
    country?: {
      name?: string
    }
  }
}

interface Props {
  id?: string
  label?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入地址',
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'address-selected': [suggestion: AddressSuggestion]
}>()

const searchQuery = ref(props.modelValue || '')
const suggestions = ref<AddressSuggestion[]>([])
const showSuggestions = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const mapboxToken = useRuntimeConfig().public.mapboxAccessToken || ''

const generateSessionToken = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const sessionToken = ref(generateSessionToken())

const handleInput = () => {
  const query = searchQuery.value
  emit('update:modelValue', query)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  if (query.length < 2) {
    suggestions.value = []
    return
  }

  debounceTimer = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(query)}&access_token=${mapboxToken}&session_token=${sessionToken.value}`
      )
      const data = await response.json()
      suggestions.value = data.suggestions || []
    } catch (error) {
      console.error('Address search error:', error)
      suggestions.value = []
    }
  }, 300)
}

const selectAddress = async (suggestion: AddressSuggestion) => {
  searchQuery.value = suggestion.full_address || ''
  emit('update:modelValue', searchQuery.value)
  
  showSuggestions.value = false
  suggestions.value = []
  
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?access_token=${mapboxToken}&session_token=${sessionToken.value}`
    )
    const data = await response.json()
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0]
      const [longitude, latitude] = feature.geometry.coordinates
      
      const placeData = {
        mapbox_id: suggestion.mapbox_id,
        name: suggestion.name,
        full_address: suggestion.full_address,
        context: suggestion.context,
        coordinates: {
          latitude,
          longitude
        }
      }
      
      emit('address-selected', placeData)
    } else {
      emit('address-selected', suggestion)
    }
  } catch (error) {
    console.error('Retrieve address error:', error)
    emit('address-selected', suggestion)
  }
  
  sessionToken.value = generateSessionToken()
}

watch(() => props.modelValue, (newValue) => {
  if (newValue !== searchQuery.value) {
    searchQuery.value = newValue
  }
})

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>
