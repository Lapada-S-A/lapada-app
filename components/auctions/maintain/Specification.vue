<template>
  <div class="mb-6">
    <div class="font-subtitle font-weight-bold text-primary mb-8">
      Especificações do leilão
    </div>

    <v-row>
      <v-col cols="4">
        <v-label
          for="title-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Título</v-label
        >
        <v-text-field
          id="title-field"
          v-model="auctionSpecification.title"
          placeholder="Título"
          maxlength="100"
        />
      </v-col>
      <v-col cols="4">
        <v-label
          for="min-increment-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Lance/Incremento mínimo (R$)</v-label
        >
        <v-text-field
          id="min-increment-field"
          v-model="auctionSpecification.min_increment"
          placeholder="Lance/Incremento mínimo (R$)"
          maxlength="20"
          type="number"
          hide-spin-buttons
          :rules="minIncrementRule"
        />
      </v-col>
      <v-col cols="4">
        <v-label
          for="end-date-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Data de Término
        </v-label>
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290"
          min-width="auto"
        >
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              id="end-date-field"
              :value="formatDatePickerDate(auctionSpecification.end_date)"
              readonly
              placeholder="Data de Término"
              append-inner-icon="mdi-calendar-month"
              clearable
              :rules="dateRule"
              @click:clear="clearDate"
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
              <v-btn class="bg-primary" :ripple="false" @click="confirmDate">
                Salvar
              </v-btn>
            </template>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-label
          for="category-autocomplete-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Categorias
        </v-label>
        <v-autocomplete
          id="categories-autocomplete-field"
          v-model="auctionSpecification.category_ids"
          :items="categories"
          variant="outlined"
          placeholder="Categorias"
          no-data-text="Nenhuma categoria disponível"
          multiple
          chips
          clearable
          clear-icon="mdi-close"
          item-value="id"
          item-title="name"
        >
          <template #chip="{ item, index, props }">
            <v-chip
              v-bind="props"
              :key="index"
              class="rounded ga-2 mr-2 bg-secondary"
              variant="flat"
            >
              <div class="text-font-10">
                {{ item.title }}
              </div>

              <template #close>
                <v-icon size="12" color="font-10" class="close-icon-spacing-top"
                  >mdi-close</v-icon
                >
              </template>
            </v-chip>
          </template>

          <template #item="{ item, index, props }">
            <v-list-item
              v-bind="props"
              :key="index"
              :title="item.title"
              color="primary"
              class="my-2 mx-4"
              density="compact"
              :prepend-icon="
                auctionSpecification.category_ids?.includes(item.value)
                  ? 'mdi-checkbox-marked'
                  : 'mdi-checkbox-blank-outline'
              "
            />
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="4">
        <v-label
          for="type-autocomplete-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Tipo
        </v-label>
        <v-autocomplete
          id="type-autocomplete-field"
          v-model="auctionSpecification.type_id"
          :items="types"
          variant="outlined"
          placeholder="Tipo"
          no-data-text="Nenhum tipo disponível"
          clearable
          clear-icon="mdi-close"
          color="primary"
          item-value="id"
          item-title="name"
        >
          <template #item="{ item, index, props }">
            <v-list-item v-bind="props" :key="index" title="" color="primary">
              {{ item.title }}
              <v-tooltip activator="parent" location="bottom" max-width="300">
                {{ types[index].description }}
              </v-tooltip>
            </v-list-item>
          </template></v-autocomplete
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-label
          for="description-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Decrição
        </v-label>
        <v-textarea
          id="description-field"
          v-model="auctionSpecification.description"
          variant="outlined"
          color="primary"
          placeholder="Escreva aqui a decrição do item leiloado"
          auto-grow
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { AuctionSpecification } from "~/interfaces/auction";
import type { Category } from "~/interfaces/category";
import type { Type } from "~/interfaces/type";

const categoriesStore = useCategoriesStore();
const typesStore = useTypesStore();
const auctionSpecification = ref<AuctionSpecification>({
  title: null,
  min_increment: null,
  end_date: null,
  category_ids: null,
  type_id: null,
  description: null,
});
const categories = ref<Category[]>([]);
const types = ref<Type[]>([]);

onMounted(async () => {
  const auctionCategories = await categoriesStore.getAllCategories();
  categories.value = auctionCategories ? auctionCategories : [];

  const auctionTypes = await typesStore.getAllTypes();
  types.value = auctionTypes ? auctionTypes : [];
});

const dateMenu = ref<boolean>(false);
const tempDate = ref<string | null>(null);

const dateRule = [
  (v: string) => {
    const currentDate = new Date();
    const selectedDate = new Date(v);
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(currentDate.getHours() + 24); // Adiciona 24 horas à data atual
    return (
      selectedDate >= currentDate ||
      "A data precisa ser no mínimo 24 horas à frente."
    );
  },
];

const minIncrementRule = [
  (v: number) => {
    return v >= 25 || "O lance mínimo deve ser de no mínimo R$ 25,00.";
  },
];

function clearDate() {
  auctionSpecification.value.end_date = null;
  tempDate.value = null;
}

function confirmDate() {
  auctionSpecification.value.end_date = tempDate.value;
  dateMenu.value = false;
}
</script>

<style scoped>
.close-icon-spacing-top {
  margin-top: 2px;
}
</style>
