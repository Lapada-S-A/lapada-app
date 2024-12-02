import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: { configFile: "assets/scss/vuetify/settings.scss" },
          })
        );
      });
    },
    //...
  ],
  css: ["@/assets/scss/globals.scss"],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
});
