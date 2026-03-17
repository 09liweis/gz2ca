// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mongoose'],
  runtimeConfig: {
    public: {
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN || ''
    }
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {
      bufferCommands: false
    },
    modelsDir: 'models',
    devtools: true,
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
        { name: 'theme-color', content: '#2563eb' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})