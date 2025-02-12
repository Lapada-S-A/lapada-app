import { useSnackbarStore } from "~/stores/snackbar";

export default defineNuxtPlugin((nuxtApp) => {
  const snackbarStore = useSnackbarStore();
  const router = useRouter();

  nuxtApp.hook("app:error", ({ message, originalError }) => {
    if (originalError?.message?.includes("Failed to fetch")) {
      if (isTokenExpired()) {
        useAuthStore().disauthenticate();
        router.push("/login");
        return snackbarStore.showSnackbar("error", "Token expirado, faça login novamente.");
      }
      return snackbarStore.showSnackbar("error", "Falha na conexão ao servidor");
    }
    snackbarStore.showSnackbar("error", message);
  });
});

const isTokenExpired = () => {
  return !!useAuthStore().token && !useAuthStore().validateToken();
};
