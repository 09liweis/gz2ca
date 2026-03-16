<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
          <p class="text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
            广州二中加拿大生活是一个充满活力的校友社区，致力于为在加拿大的广州二中校友提供交流、互助和发展的平台
          </p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>

    <!-- Mission Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="order-2 lg:order-1">
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">我们的使命</h2>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              我们致力于打造一个温暖的校友家园，让每一位在加拿大的广州二中校友都能找到归属感。通过组织各类活动、分享经验和建立联系，我们希望帮助校友们在异国他乡更好地生活、学习和发展。
            </p>
            <p class="text-gray-700 text-lg leading-relaxed">
              无论您是刚到加拿大的新生，还是已经在这里扎根多年的前辈，这里都是您的精神港湾。让我们携手共进，共同书写在加拿大的精彩故事。
            </p>
          </div>
        </div>
        <div class="order-1 lg:order-2">
          <div class="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
            <div class="text-center p-8">
              <svg class="w-32 h-32 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-blue-600 font-medium">使命愿景图片</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">我们的核心价值观</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            这些价值观指导着我们的每一个决策和行动
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">团结互助</h3>
            <p class="text-gray-600 leading-relaxed">
              我们相信团结就是力量。在异国他乡，校友之间的互相帮助和支持是我们最宝贵的财富。
            </p>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">真诚包容</h3>
            <p class="text-gray-600 leading-relaxed">
              我们倡导真诚的交流和包容的态度，尊重每一位校友的独特经历和观点，共同营造温暖的社区氛围。
            </p>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">积极进取</h3>
            <p class="text-gray-600 leading-relaxed">
              我们鼓励校友们积极进取，不断学习成长，在加拿大这片土地上实现自己的梦想和价值。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
            <div class="text-center p-8">
              <svg class="w-32 h-32 mx-auto text-cyan-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-cyan-600 font-medium">社区活动图片</p>
            </div>
          </div>
        </div>
        <div>
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">我们的故事</h2>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              广州二中加拿大生活始于一群热爱母校、怀念青春的校友们的简单想法。我们希望在远离故乡的土地上，也能感受到来自母校的温暖和同学的陪伴。
            </p>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              从最初的几个人，到如今覆盖加拿大多个城市的庞大网络，我们的社区在不断成长壮大。每一次聚会、每一场活动，都凝聚着校友们的热情和付出。
            </p>
            <p class="text-gray-700 text-lg leading-relaxed">
              未来，我们将继续努力，为更多的广州二中校友提供帮助和支持，让这个大家庭变得更加温暖和强大。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
            <div class="text-blue-100 text-lg">活跃校友</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
            <div class="text-blue-100 text-lg">年度活动</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">10+</div>
            <div class="text-blue-100 text-lg">覆盖城市</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">5+</div>
            <div class="text-blue-100 text-lg">社区年龄</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">核心团队</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          我们的团队成员都是热心的志愿者，致力于为社区服务
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
          <div class="bg-gradient-to-br from-blue-100 to-cyan-100 h-64 flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p class="text-blue-600 font-medium">团队成员照片</p>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">创始人</h3>
            <p class="text-blue-600 font-medium mb-3">社区发起人</p>
            <p class="text-gray-600">负责社区整体规划和发展方向，致力于打造一个温暖的校友家园。</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
          <div class="bg-gradient-to-br from-green-100 to-cyan-100 h-64 flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p class="text-green-600 font-medium">团队成员照片</p>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">活动负责人</h3>
            <p class="text-green-600 font-medium mb-3">活动组织者</p>
            <p class="text-gray-600">策划和组织各类校友活动，确保每次活动都能给大家带来美好的体验。</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
          <div class="bg-gradient-to-br from-purple-100 to-pink-100 h-64 flex items-center justify-center">
            <div class="text-center">
              <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p class="text-purple-600 font-medium">团队成员照片</p>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">技术负责人</h3>
            <p class="text-purple-600 font-medium mb-3">平台维护者</p>
            <p class="text-gray-600">负责平台的技术开发和维护，为校友们提供便捷的在线交流工具。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          加入我们的大家庭
        </h2>
        <p class="text-xl text-blue-50 mb-8 leading-relaxed">
          无论您身在加拿大哪座城市，无论您毕业于哪一年，我们都欢迎您的加入。让我们一起创造更多美好的回忆！
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton to="/signup" class="!px-8 !py-4 !bg-white !text-primary !shadow-lg hover:!bg-gray-50 text-lg">
            立即注册
          </LinkButton>
          <LinkButton to="/events" class="!px-8 !py-4 !border-2 !border-white !text-white hover:!bg-white hover:!text-primary text-lg">
            查看活动
          </LinkButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import LinkButton from '~/components/form/LinkButton.vue'

useHead({
  title: '关于我们 - 广州二中加拿大生活',
  meta: [
    { name: 'description', content: '了解广州二中加拿大生活的使命、愿景和价值观。我们致力于为在加拿大的广州二中校友提供一个温暖的交流、互助和发展平台。' },
    { name: 'keywords', content: '广州二中加拿大生活, 关于我们, 使命, 愿景, 价值观, 校友社区' },
    { property: 'og:title', content: '关于我们 - 广州二中加拿大生活' },
    { property: 'og:description', content: '广州二中加拿大生活是一个充满活力的校友社区，致力于为在加拿大的广州二中校友提供交流、互助和发展的平台' },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
