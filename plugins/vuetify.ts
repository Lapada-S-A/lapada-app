import "@mdi/font/css/materialdesignicons.css";
import "@/assets/scss/vuetify/main.scss";
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
          colors: {
            primary: "#053CC7",
            'font-primary-10': "#FFFFFF"
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
