<template>
  <v-snackbar
    v-model="snackbarStore.show"
    :timeout="snackbarStore.timeout"
    location="top"
    rounded
    :color="snackbarStore.status"
    min-height="68"
    class="mt-10"
    @click="snackbarStore.hideSnackbar"
  >
    <div class="d-flex align-center pl-8 py-4">
      <v-icon size="20" color="font-10">{{ icon }}</v-icon>
      <div class="ml-6 font-weight-medium font-large text-font-10">
        <div>{{ snackbarStore.message }}</div>
      </div>
    </div>
    <template #actions>
      <v-btn
        size="20"
        variant="text"
        class="ml-16 mr-4"
        @click="snackbarStore.hideSnackbar"
      >
        <v-icon size="16" class="text-font-10">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const snackbarStore = useSnackbarStore();
const icon = computed(() => {
  const icons: { [key: string]: string } = {
    success: "mdi-check-circle",
    error: "mdi-close-circle",
    info: "mdi-information",
    warning: "mdi-alert",
  };
  return icons[snackbarStore.status];
});
</script>

<style>
.v-snackbar__content {
  padding: 0 !important;
}
</style>
