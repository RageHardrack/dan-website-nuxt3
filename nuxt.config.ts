import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@morev/vue-transitions/nuxt",
    "nuxt-icon",
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", ["defineStore", "definePiniaStore"]] },
    ],
  ],
  devServer: {
    port: 3000,
  },
});
