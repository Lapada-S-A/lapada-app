<template>
  <v-dialog v-model="isOpen" max-width="800">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="plain"
        :ripple="false"
        size="20"
        class="mb-4"
        @click="openModal"
      >
        <v-icon size="20">mdi-filter-variant</v-icon>
      </v-btn>
    </template>

    <v-card class="rounded-lg pa-4">
      <div>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="font-subtitle font-weight-bold">Filtrar Leilões</div>
          <v-btn
            id="close-filter-button"
            class="rounded-xl"
            variant="plain"
            :ripple="false"
            size="22"
            @click="closeModal"
            ><v-icon> mdi-close</v-icon></v-btn
          >
        </v-card-title>
      </div>

      <v-card-text class="px-1 py-6">
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-label class="text-font-100" for="category-filter"
                >Categoria</v-label
              >
              <v-autocomplete
                id="category-filter"
                v-model="filters.category"
                variant="outlined"
                :items="categories"
                placeholder="Escolha a categoria"
                return-object
                clearable
              />
            </v-col>
            <v-col cols="4">
              <v-label class="text-font-100" for="auction-type-filter"
                >Tipo de Leilão</v-label
              >
              <v-autocomplete
                id="auction-type-filter"
                v-model="filters.auctionType"
                variant="outlined"
                :items="auctionTypes"
                placeholder="Escolha um tipo"
                return-object
                clearable
              />
            </v-col>
            <v-col cols="4">
              <v-label class="text-font-100" for="status-filter"
                >Status</v-label
              >
              <v-autocomplete
                id="status-filter"
                v-model="filters.status"
                variant="outlined"
                :items="statuses"
                placeholder="Escolha um status"
                return-object
                clearable
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-label class="text-font-100" for="min-bid-filter"
                >Lance Mínimo</v-label
              >
              <v-text-field
                id="min-bid-filter"
                v-model="filters.minBid"
                variant="outlined"
                hide-spin-buttons
                type="number"
                placeholder="Digite o lance mínimo"
                clearable
                :rules="[
                  (value) =>
                    !value || value >= 25 || 'Deve ser no mínimo R$25,00',
                ]"
              />
            </v-col>
            <v-col cols="6">
              <v-label class="text-font-100" for="max-bid-filter"
                >Lance Máximo</v-label
              >
              <v-text-field
                id="max-bid-filter"
                v-model="filters.maxBid"
                variant="outlined"
                hide-spin-buttons
                type="number"
                placeholder="Digite o lance máximo"
                clearable
                :rules="[
                  (value) => !value || value >= 0 || 'Não pode ser negativo',
                ]"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="dateMenu"
                v-model:return-value="filters.endDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290"
                min-width="auto"
              >
                <template #activator="{ props }">
                  <v-label class="text-font-100" for="limit-date-filter"
                    >Data de Término</v-label
                  >
                  <v-text-field
                    v-bind="props"
                    id="limit-date-filter"
                    :value="formatDate(filters.endDate?.toString() || null)"
                    readonly
                    variant="outlined"
                    placeholder="Selecione uma data"
                    :append-inner-icon="'mdi-calendar'"
                    clearable
                    @click:clear="filters.endDate = null"
                  />
                </template>
                <v-date-picker
                  v-model="tempDate"
                  locale="pt-BR"
                  size="small"
                  @input="dateMenu = false"
                >
                  <template #actions>
                    <v-btn :ripple="false" @click="clearDate">Limpar</v-btn>
                    <v-btn
                      class="bg-primary"
                      :ripple="false"
                      @click="confirmDate"
                      >Salvar</v-btn
                    >
                  </template>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="px-4">
        <v-btn
          class="btn btn-secondary mr-1 px-6"
          width="120"
          @click="clearFilters"
          >Limpar</v-btn
        >
        <v-btn class="btn btn-primary" width="120" @click="applyFilters"
          >Salvar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { FilterData } from "~/interfaces/auction-filter";
const isOpen = ref<boolean>(false);
const dateMenu = ref<boolean>(false);
const tempDate = ref<string | null>(null);
const filters = ref<FilterData>({
  category: null,
  auctionType: null,
  status: null,
  minBid: null,
  maxBid: null,
  endDate: null,
});

const categories = ref<string[]>(["Eletrônicos", "Imóveis", "Veículos"]);
const auctionTypes = ref<string[]>(["Comum", "Reverso"]);
const statuses = ref<string[]>(["Aberto", "Encerrado", "Pendente"]);

const emits = defineEmits(["apply-filters", "clear-filters"]);

const formatDate = (date: string | null): string | null => {
  if (!date) return null;
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
};

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const clearFilters = () => {
  filters.value = {
    category: null,
    auctionType: null,
    status: null,
    minBid: null,
    maxBid: null,
    endDate: null,
  };
  emits("clear-filters");
};

const clearDate = () => {
  tempDate.value = null;
  filters.value.endDate = null;
};

const confirmDate = () => {
  filters.value.endDate = tempDate.value;
  dateMenu.value = false;
};

const applyFilters = () => {
  emits("apply-filters", filters.value);
  closeModal();
};
</script>

<style scoped>
.v-label {
  opacity: 1 !important;
  font-weight: 500;
  margin-bottom: 5px;
}

.v-col {
  padding: 0 10px;
}

:deep(.v-picker__actions .v-btn) {
  text-transform: none;
  padding: 0 16px;
}

:deep(.v-icon) {
  margin-bottom: 3px !important;
}
</style>
