<template>
  <footer class="bg-gray-900 text-gray-300 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="border-t border-gray-800 pt-6">
        <p class="text-sm text-gray-400 text-center">
          &copy; {{ currentYear }} 广州人在加拿大
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
