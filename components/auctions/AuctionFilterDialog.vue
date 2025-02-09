<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
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
                v-model="filters.categoryId"
                variant="outlined"
                :items="categories"
                no-data-text="Nenhuma categoria disponível"
                item-title="name"
                item-value="id"
                placeholder="Escolha a categoria"
                clearable
                clear-icon="mdi-close"
                return-object
              />
            </v-col>
            <v-col cols="4">
              <v-label class="text-font-100" for="auction-type-filter"
                >Tipo de Leilão</v-label
              >
              <v-autocomplete
                id="auction-type-filter"
                v-model="filters.typeId"
                variant="outlined"
                :items="auctionTypes"
                item-title="name"
                item-value="id"
                placeholder="Escolha um tipo"
                clearable
                clear-icon="mdi-close"
                return-object
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
                item-title="label"
                item-value="name"
                placeholder="Escolha um status"
                clearable
                clear-icon="mdi-close"
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
                clear-icon="mdi-close"
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
                clear-icon="mdi-close"
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
                    :value="
                      formatDatePickerDate(filters.endDate?.toString() || null)
                    "
                    readonly
                    variant="outlined"
                    placeholder="Selecione uma data"
                    :append-inner-icon="'mdi-calendar-month'"
                    clearable
                    clear-icon="mdi-close"
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
import type {
  FilterData,
  ModelWithId,
  ModelWithLabel,
} from "~/interfaces/auction-filter";
import type { Category } from "~/interfaces/category";

const isOpen = ref<boolean>(false);
const dateMenu = ref<boolean>(false);
const tempDate = ref<string | null>(null);
const categoriesStore = useCategoriesStore();
const filters = ref<FilterData>({
  categoryId: null,
  typeId: null,
  status: null,
  minBid: null,
  maxBid: null,
  endDate: null,
});

const previousFilters = ref<FilterData>({ ...filters.value });
const categories = ref<Category[]>([]);

onMounted(async () => {
  const auctionCategories = await categoriesStore.getAllCategories();
  categories.value = auctionCategories ? auctionCategories : [];
});

const auctionTypes = ref<ModelWithId[]>([
  { id: 1, name: "Comum" },
  { id: 2, name: "Por Proximidade" },
  { id: 3, name: "Reverso" },
]);

const statuses = ref<ModelWithLabel[]>([
  { label: "Aberto", name: "OPEN" },
  { label: "Encerrado", name: "CLOSED" },
  { label: "Pendente", name: "PENDING" },
]);

const emits = defineEmits(["apply-filters", "clear-filters"]);

const openModal = () => {
  previousFilters.value = { ...filters.value };
  isOpen.value = true;
};

const closeModal = () => {
  filters.value = { ...previousFilters.value };
  isOpen.value = false;
};

const clearFilters = () => {
  filters.value = {
    categoryId: null,
    typeId: null,
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
  isOpen.value = false;
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

:deep(.v-field__append-inner > .v-icon) {
  opacity: 1;
  color: rgba(var(--v-theme-primary));
  cursor: pointer;
}
</style>
