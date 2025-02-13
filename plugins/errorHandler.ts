import { useSnackbarStore } from "~/stores/snackbar";

export default defineNuxtPlugin((nuxtApp) => {
  const snackbarStore = useSnackbarStore();
  const authStore = useAuthStore();
  const router = useRouter();

  nuxtApp.hook("app:error", ({ message, originalError }) => {
    if (originalError?.message?.includes("Failed to fetch")) {
      if (isTokenExpired()) {
        authStore.disauthenticate();
        router.push("/login");
        return snackbarStore.showSnackbar(
          "error",
          "Token expirado, faça login novamente."
        );
      }
      return snackbarStore.showSnackbar(
        "error",
        "Falha na conexão ao servidor"
      );
    }
    snackbarStore.showSnackbar("error", message);
  });
});

const isTokenExpired = () => {
  const authStore = useAuthStore();
  return !!authStore.token && !authStore.validateToken();
};
