import { useAuthStore } from "~/stores/auth";
import { useSnackbarStore } from "~/stores/snackbar";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const snackbarStore = useSnackbarStore();
  const routesStore = useRoutesStore();

  if (to.path !== "/login") {
    if (to.path !== "/register") {
      if (!authStore.token) {
        return navigateTo("/login");
      }

      if (!authStore.validateToken()) {
        authStore.disauthenticate();
        snackbarStore.showSnackbar(
          "error",
          "Token expirado, faça login novamente"
        );
        return navigateTo("/login");
      }

      if (!routesStore.userRoutes.some((route) => route.to === to.path)) {
        return navigateTo("/");
      }
    }
  } else {
    if (authStore.validateToken()) {
      return navigateTo("/");
    }
  }
});
