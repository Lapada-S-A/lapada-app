<template>
  <div class="d-flex justify-center mb-4">
    <v-text-field
      v-model="searchQuery"
      placeholder="Pesquisar..."
      outlined
      hide-details
      max-width="500"
    >
      <template #prepend-inner>
        <v-icon size="20" color="primary" class="mb-4 mr-1">mdi-magnify</v-icon>
      </template>

      <template #append-inner>
        <v-btn variant="text" :ripple="false" size="20" class="mb-4 pl-1">
          <v-icon size="20" color="primary" class="mb-4 mr-1"
            >mdi-filter-variant</v-icon
          >
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const emit = defineEmits(["update:searchQuery"]);

watch(searchQuery, (newQuery) => {
  emit("update:searchQuery", newQuery);
});
</script>

<style scoped>
:deep(.v-input__control) {
  height: 40px;
}

:deep(.v-field--variant-outlined .v-field__outline) {
  color: rgba(var(--v-theme-primary)) !important;
  border-radius: 6px !important;
  --v-field-border-opacity: 1 !important;
  --v-field-border-width: 2px !important;
}

:deep(.v-field__input) {
  padding-top: 0;
}

:deep(.v-field__prepend-inner > .v-icon),
:deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
}
</style>
