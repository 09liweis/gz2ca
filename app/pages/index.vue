<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          欢迎来到广州二中加拿大生活
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          这里是广州二中校友在加拿大的精神家园。我们在这里分享生活、组织活动、建立联系，共同书写在异国他乡的精彩篇章。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/about-us" class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            了解更多
          </NuxtLink>
          <NuxtLink to="/events" class="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            查看活动
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">我们的特色</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div class="text-blue-600 mb-4">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">校友联系</h3>
          <p class="text-gray-600">寻找在加拿大的广州二中校友，建立联系，拓展人脉，互相支持。</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div class="text-blue-600 mb-4">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">精彩活动</h3>
          <p class="text-gray-600">定期组织聚会、讲座、户外活动等，让校友们在异国他乡也能感受家的温暖。</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div class="text-blue-600 mb-4">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">经验分享</h3>
          <p class="text-gray-600">分享在加拿大的学习、工作、生活经验，帮助校友们更好地融入当地社会。</p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="bg-blue-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">关于我们</h2>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
          广州二中加拿大生活是一个由广州二中校友发起的非营利性组织，旨在为在加拿大的广州二中校友提供一个交流、互助、发展的平台。
        </p>
        <NuxtLink to="/about-us" class="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          了解更多
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '广州二中加拿大生活 - 校友社区',
  meta: [
    { name: 'description', content: '广州二中加拿大生活是广州二中校友在加拿大的官方社区平台，提供校友联系、活动组织、经验分享等服务。' },
    { name: 'keywords', content: '广州二中, 加拿大, 校友, 社区, 活动, 联系, 经验分享' },
    { property: 'og:title', content: '广州二中加拿大生活 - 校友社区' },
    { property: 'og:description', content: '这里是广州二中校友在加拿大的精神家园。我们在这里分享生活、组织活动、建立联系，共同书写在异国他乡的精彩篇章。' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '广州二中加拿大生活 - 校友社区' },
    { name: 'twitter:description', content: '这里是广州二中校友在加拿大的精神家园。我们在这里分享生活、组织活动、建立联系，共同书写在异国他乡的精彩篇章。' }
  ]
})
</script>
