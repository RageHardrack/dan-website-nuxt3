import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@morev/vue-transitions/nuxt",
    "nuxt-icon",
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", ["defineStore", "definePiniaStore"]] },
    ],
    "dayjs-nuxt",
  ],

  pinia: {
    storesDirs: ["./stores/**"],
  },

  devServer: {
    port: 3000,
  },

  dayjs: {
    locales: ["es", "en"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "es",
  },

  // app: {
  //   layoutTransition: { name: "layout", mode: "out-in" },
  //   pageTransition: { name: "page", mode: "out-in" },
  // },
  runtimeConfig: {
    notionSecret: process.env.NOTION_API_KEY,
    homePage: process.env.NOTION_HOME_ID,
    aboutPage: process.env.NOTION_ABOUT_ID,
    blogPage: process.env.NOTION_BLOG_ID,
    portfolioPage: process.env.NOTION_PORTFOLIO_ID,
    linkTreePage: process.env.NOTION_LINK_TREE_ID,
    environment: process.env.APP_ENVIRONMENT,
    devEnv: process.env.DEVELOPMENT_STAGE,
    prodEnv: process.env.PRODUCTION_STAGE,
  },

  compatibilityDate: "2024-09-29",
});