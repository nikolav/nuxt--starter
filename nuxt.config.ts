import vuetify from "vite-plugin-vuetify";

import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from "./config/vars";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
// https://www.geeksforgeeks.org/meta-tags-in-nuxt-js/
export default defineNuxtConfig({
  runtimeConfig: {
    // server .env
    public: {},
    // @server add secrets
    // useRuntimeConfig()
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("listen", (server) => {
        console.log({
          server,
          nuxt,
          options,
        });
      });
    },
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore"],
      },
    ],
    async (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins && config.plugins.push(vuetify());
      });
    },
  ],
  app: {
    head: {
      charset: "utf-16",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "nuxtapp",
      titleTemplate: "%s | Nuxt3",
      meta: [
        { name: "description", content: "App" },
        { name: "theme-color", content: "#fafafa" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        },
      ],
    },
    // css-transition all pages
    pageTransition: { name: "PAGE", mode: "out-in" },
    // enable layout transitions to apply an automatic transition for all layouts
    layoutTransition: { name: "PAGE", mode: "out-in" },
  },
  css: [
    "@/assets/style/reset.css",
    "@/assets/style/main.scss",
    // "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    // https://nuxt.com/docs/guide/directory-structure/server#example-using-redis
    storage: {
      redis: {
        driver: "redis",
        port: REDIS_PORT,
        host: REDIS_HOST,
        username: "",
        password: REDIS_PASSWORD,
        db: 0,
        tls: {},
      },
    },
  },
  tailwindcss: {
    cssPath: "~/src/tailwind.css",
    configPath: "~/config/tailwind.cjs",
    // exposeConfig: false,
    // config: {},
    // injectPosition: 0,
    viewer: false,
  },
});
