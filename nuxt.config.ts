// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
  },
})
