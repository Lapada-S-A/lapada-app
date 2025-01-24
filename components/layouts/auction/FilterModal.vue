<template>
  <v-dialog v-model="isOpen" max-width="800">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="plain"
        :ripple="false"
        icon="mdi-filter-variant"
        @click="openModal"
      />
    </template>

    <v-card class="rounded-lg pa-3">
      <div class="px-4">
        <v-card-title class="d-flex justify-space-between align-center py-5">
          <h3>Filtrar Leilões</h3>
          <v-btn
            id="close-filter-button"
            icon="mdi-close"
            class="rounded-xl"
            variant="plain"
            :ripple="false"
            size="35"
            @click="closeModal"
          />
        </v-card-title>
      </div>

      <v-card-text>
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
                    :value="formatDate(filters.endDate)"
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

      <v-card-actions>
        <v-spacer />
        <v-btn variant="plain" :ripple="false" @click="clearFilters"
          >Limpar</v-btn
        >
        <v-btn class="bg-primary px-6 ml-2" @click="applyFilters"
          >Aplicar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const dateMenu = ref(false);
const tempDate = ref(null);
const filters = ref({
  category: null,
  auctionType: null,
  status: null,
  minBid: null,
  maxBid: null,
  endDate: null,
});

const categories = ["Eletrônicos", "Imóveis", "Veículos"];
const auctionTypes = ["Comum", "Reverso"];
const statuses = ["Aberto", "Encerrado", "Pendente"];

const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
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
  console.log("Filtros aplicados:", filters.value);
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
</style>
