// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-mongoose'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: 'models',
    devtools: true,
  },
})