import "@/assets/scss/vuetify/main.scss";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { pt } from 'vuetify/locale';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
    },
    locale: {
      locale: 'pt', 
      messages: { pt },
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
            "red-rose": "#DA5E5E",
            "green-jade": "#62A74B"
          },
        },
      },
    },
    defaults: {
      VBtn: {
        variant: "flat",
      },
      VTextField: {
        variant: "outlined",
        color: "primary",
      },
    },
  });
  app.vueApp.use(vuetify);
});
