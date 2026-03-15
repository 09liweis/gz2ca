import { ref, computed } from 'vue'
import { get } from '~/utils/http'

interface User {
  _id: string
  fn: string
  ln: string
  eml: string
  graduationYear?: string
  location?: string
  bio?: string
  avt?: string
  role?: string
}

// Global user state
const user = ref<User | null>(null)
const loading = ref(false)
const initialized = ref(false)

// Check if user is logged in
export const isLoggedIn = computed(() => !!user.value)

// Get user's full name
export const userName = computed(() => {
  if (!user.value) return ''
  return `${user.value.fn} ${user.value.ln}`.trim()
})

// Initialize auth state
export const initAuth = async () => {
  if (initialized.value) return

  const token = localStorage.getItem('token')
  if (!token) {
    initialized.value = true
    return
  }

  loading.value = true
  try {
    const response = await get('/api/user/profile')
    if (response.success && response.user) {
      user.value = response.user as User
    }
  } catch (error) {
    // Token might be invalid, clear it
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    user.value = null
  } finally {
    loading.value = false
    initialized.value = true
  }
}

// Update user data
export const updateUser = (userData: Partial<User>) => {
  if (user.value) {
    user.value = { ...user.value, ...userData }
  }
}

// Logout function
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  user.value = null
  initialized.value = false
  navigateTo('/')
}

// Get user ref
export const useUser = () => ({
  user,
  loading,
  isLoggedIn,
  userName,
  initAuth,
  updateUser,
  logout
})
