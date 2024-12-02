import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
    },
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          colors: {},
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
