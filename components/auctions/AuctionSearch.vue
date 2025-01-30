<template>
  <div class="d-flex flex-column justify-center ga-4 mb-4">
    <div class="d-flex justify-center">
      <v-text-field
        id="auctions-search-textfield"
        v-model="searchQuery"
        placeholder="Pesquisar..."
        outlined
        hide-details
        max-width="500"
      >
        <template #prepend-inner>
          <v-icon size="20" color="primary" class="mb-4 mr-1"
            >mdi-magnify</v-icon
          >
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
    <div class="d-flex justify-center ga-2">
      <div v-for="(filter, index) in appliedFilters" :key="index">
        <v-chip
          density="compact"
          class="d-flex align-center font-small font-weight-semibold"
        >
          {{ filter }}
          <template #close>
            <v-icon size="12" class="ml-1">mdi-close</v-icon>
          </template>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:searchQuery"]);
const searchQuery = ref("");
const appliedFilters = ["Relíquia", "Automóvel"];

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

:deep(.v-chip) {
  border-radius: 6px;
  color: rgba(var(--v-theme-font-10));
  background-color: rgba(var(--v-theme-secondary));
}
</style>
