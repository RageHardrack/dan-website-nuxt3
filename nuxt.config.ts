import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@morev/vue-transitions/nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
  ],
  pinia: { autoImports: ["defineStore", ["defineStore", "definePiniaStore"]] },
  imports: {
    dirs: ["stores"],
  },
  devServer: {
    port: 3000,
  },
});
