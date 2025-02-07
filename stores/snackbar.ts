export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    status: "info" as "success" | "error" | "info" | "warning",
    message: "" as string,
    timeout: 1500 as number,
    show: false as boolean,
  }),

  actions: {
    showSnackbar(
      status: "success" | "error" | "info" | "warning",
      message: string,
      timeout: number = 1500
    ) {
      this.status = status;
      this.message = message;
      this.timeout = timeout;
      this.show = true;
    },
    hideSnackbar() {
      this.show = false;
    },
  },
});
