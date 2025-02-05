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
          <AuctionFilterDialog @apply-filters="applyFilters" />
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
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionFilterDialog from "@/components/auctions/AuctionFilterDialog.vue";
import type { FilterData } from "~/interfaces/auction-filter";

const emit = defineEmits(["update:searchQuery", "apply-filters"]);
const searchQuery = ref("");
const appliedFilters = ref<string[]>([]);

watch(searchQuery, (newQuery) => {
  emit("update:searchQuery", newQuery);
});

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `Data de término: ${day}/${month}/${year}`;
};

const applyFilters = (filters: FilterData) => {
  appliedFilters.value = Object.entries(filters)
    .map(([key, value]) => {
      if (value === null || value === undefined) return null;

      if (typeof value === "object") {
        if (value instanceof Date) {
          return formatDate(value);
        } else if ("name" in value) {
          return value.name;
        }
      }

      if (key === "maxBid" || key === "minBid") {
        return `${
          key === "maxBid" ? "Lance Máximo" : "Lance Mínimo"
        }: R$ ${value}`;
      }

      return value;
    })
    .filter((f): f is string => typeof f === "string");
  emit("apply-filters", filters);
};
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
