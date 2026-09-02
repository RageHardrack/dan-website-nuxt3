import { defineNuxtConfig } from 'nuxt/config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Enable Nuxt 4 behavior
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/icon',
    [
      '@pinia/nuxt',
      { autoImports: ['defineStore', ['defineStore', 'definePiniaStore']] },
    ],
    'dayjs-nuxt',
  ],

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  devServer: {
    port: 3000,
  },

  dayjs: {
    locales: ['es', 'en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'es',
  },

  // app: {
  //   layoutTransition: { name: "layout", mode: "out-in" },
  //   pageTransition: { name: "page", mode: "out-in" },
  // },


  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:3000/api/v1',
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        process.env.API_BASE_URL ||
        'https://api.dragon-azul.dev/api/v1',
    },
  },

  compatibilityDate: '2024-09-29',
});
