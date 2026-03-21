// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mongoose','@vercel/analytics'],
  runtimeConfig: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    public: {
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN || '',
      googleClientId: process.env.GOOGLE_CLIENT_ID || ''
    }
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2
    },
    modelsDir: 'models',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'charset', content: 'UTF-8' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#11817b' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})