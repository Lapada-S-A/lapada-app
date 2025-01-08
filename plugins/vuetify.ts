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
            "primary-60": "#F6F6F6",
            secondary: "#5E85E6",
            "on-surface": "#121212",
            "font-100": "#121212",
            "font-60": "#A4A4A4",
            "font-10": "#FFFFFF",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
