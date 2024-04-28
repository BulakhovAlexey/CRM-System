export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    //pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@nuxt/ui',
    '@vee-validate/nuxt',
    'nuxt-icon',
    '@pinia/nuxt',
    "@nuxt/image"
  ],
  veeValidate: {
    autoImports: true,
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})