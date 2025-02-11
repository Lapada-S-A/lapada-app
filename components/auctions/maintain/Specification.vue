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
          :error-messages="titleError"
          @input="titleError = []"
        />
      </v-col>
      <v-col cols="4">
        <v-label
          for="initial-value-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
          >Valor inicial (R$)</v-label
        >
        <v-text-field
          id="initial-value-field"
          v-model="auctionSpecification.initial_value"
          placeholder="Valor inicial (R$)"
          maxlength="20"
          type="number"
          hide-spin-buttons
          :error-messages="initialValueError"
          @input="initialValueError = []"
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
          :error-messages="minIncrementError"
          @input="minIncrementError = []"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-label
          for="end-date-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Data de término
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
              placeholder="Data de término"
              append-inner-icon="mdi-calendar-month"
              clearable
              :error-messages="endDateError"
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
              <v-btn
                class="bg-primary"
                :ripple="false"
                @click="
                  confirmDate();
                  endDateError = [];
                "
              >
                Salvar
              </v-btn>
            </template>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-label
          for="categories-autocomplete-field"
          class="text-font-100 font-weight-semibold mb-2 ml-1"
        >
          Categorias
        </v-label>
        <v-autocomplete
          id="categories-autocomplete-field"
          v-model="auctionSpecification.categories"
          :items="categoriesStore.categories"
          variant="outlined"
          placeholder="Categorias"
          no-data-text="Nenhuma categoria disponível"
          multiple
          chips
          clearable
          clear-icon="mdi-close"
          item-value="id"
          item-title="name"
          :error-messages="categoriesError"
          @update:model-value="categoriesError = []"
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
                auctionSpecification.categories?.includes(item.value)
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
          :items="typesStore.types"
          variant="outlined"
          placeholder="Tipo"
          no-data-text="Nenhum tipo disponível"
          clearable
          clear-icon="mdi-close"
          color="primary"
          item-value="id"
          item-title="name"
          :error-messages="typeError"
          @update:model-value="typeError = []"
        >
          <template #item="{ item, index, props }">
            <v-list-item v-bind="props" :key="index" title="" color="primary">
              {{ item.title }}
              <v-tooltip activator="parent" location="bottom" max-width="300">
                {{ typesStore.types[index].description }}
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
          Descrição
        </v-label>
        <v-textarea
          id="description-field"
          v-model="auctionSpecification.description"
          variant="outlined"
          color="primary"
          placeholder="Escreva aqui a decrição do item leiloado"
          auto-grow
          :error-messages="descriptionError"
          @input="descriptionError = []"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Auction, AuctionSpecification } from "~/interfaces/auction";

const componentProps = defineProps<{ validate: boolean; auction?: Auction }>();
const emit = defineEmits(["update:validation", "update:specification"]);
const categoriesStore = useCategoriesStore();
const typesStore = useTypesStore();
const auctionSpecification = ref<AuctionSpecification>({
  title: null,
  initial_value: null,
  min_increment: null,
  end_date: null,
  categories: null,
  type_id: null,
  description: null,
});

onMounted(async () => {
  await categoriesStore.getAllCategories();
  await typesStore.getAllTypes();

  if (componentProps.auction) {
    auctionSpecification.value.title = componentProps.auction.title;
    auctionSpecification.value.initial_value =
      componentProps.auction.initial_value > 0
        ? auctionSpecification.value.initial_value
        : null;
    auctionSpecification.value.min_increment =
      componentProps.auction.min_increment > 0
        ? auctionSpecification.value.min_increment
        : null;
    auctionSpecification.value.end_date = convertDate(
      componentProps.auction.end_date
    );
    auctionSpecification.value.categories = [
      ...componentProps.auction.categories,
    ];
    auctionSpecification.value.type_id = componentProps.auction.type_id;
    auctionSpecification.value.description = componentProps.auction.description;
  }
});

const dateMenu = ref<boolean>(false);
const tempDate = ref<string | null>(null);

const titleError = ref<string[]>([]);
const initialValueError = ref<string[]>([]);
const minIncrementError = ref<string[]>([]);
const endDateError = ref<string[]>([]);
const categoriesError = ref<string[]>([]);
const typeError = ref<string[]>([]);
const descriptionError = ref<string[]>([]);

function validateTitle() {
  if (
    !auctionSpecification.value.title ||
    auctionSpecification.value.title.length === 0
  ) {
    titleError.value = ["Título é obrigatório"];
    return false;
  }
  titleError.value = [];
  return true;
}

function validateInitialValue() {
  if (
    !auctionSpecification.value.initial_value ||
    auctionSpecification.value.initial_value < 5
  ) {
    initialValueError.value = ["O valor inicial deve ser de no mínimo R$ 5,00"];
    return false;
  }
  initialValueError.value = [];
  return true;
}

function validateMinIncrement() {
  if (
    !auctionSpecification.value.min_increment ||
    auctionSpecification.value.min_increment < 5
  ) {
    minIncrementError.value = ["O lance mínimo deve ser de no mínimo R$ 5,00"];
    return false;
  }
  minIncrementError.value = [];
  return true;
}

function validateEndDate() {
  const currentDate = new Date();
  const selectedDate = new Date(auctionSpecification.value.end_date || "");
  if (!auctionSpecification.value.end_date) {
    endDateError.value = ["Data de término é obrigatória"];
    return false;
  }
  if (selectedDate.getTime() - currentDate.getTime() < 24 * 60 * 60 * 1000) {
    endDateError.value = [
      "Data de término deve ser no mínimo 24 horas à frente",
    ];
    return false;
  }
  endDateError.value = [];
  return true;
}

function validateCategories() {
  if (
    !auctionSpecification.value.categories ||
    auctionSpecification.value.categories.length === 0
  ) {
    categoriesError.value = ["Pelo menos uma categoria deve ser selecionada"];
    return false;
  }
  categoriesError.value = [];
  return true;
}

function validateType() {
  if (!auctionSpecification.value.type_id) {
    typeError.value = ["Tipo é obrigatório"];
    return false;
  }
  typeError.value = [];
  return true;
}

function validateDescription() {
  if (
    !auctionSpecification.value.description ||
    auctionSpecification.value.description.length === 0
  ) {
    descriptionError.value = ["Descrição é obrigatória"];
    return false;
  }
  descriptionError.value = [];
  return true;
}

function clearDate() {
  auctionSpecification.value.end_date = null;
  tempDate.value = null;
}

function confirmDate() {
  if (tempDate.value) {
    auctionSpecification.value.end_date = new Date(tempDate.value)
      .toISOString()
      .slice(0, -1);
  }
  dateMenu.value = false;
}

function convertDate(input: string) {
  const [day, month, year, hours, minutes, seconds] = input.split("-");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return new Date(formattedDate).toISOString().slice(0, -1);
}

watch(
  () => componentProps.validate,
  () => {
    const titleValidation = validateTitle();
    const initialValueValidation = validateInitialValue();
    const minIncrementValidation = validateMinIncrement();
    const endDateValidation = validateEndDate();
    const categoriesValidation = validateCategories();
    const typeValidation = validateType();
    const descriptionValidation = validateDescription();

    if (
      titleValidation &&
      initialValueValidation &&
      minIncrementValidation &&
      endDateValidation &&
      categoriesValidation &&
      typeValidation &&
      descriptionValidation
    ) {
      emit("update:specification", auctionSpecification.value);
      emit("update:validation", true);
    } else {
      emit("update:validation", false);
    }
  }
);
</script>

<style scoped>
.close-icon-spacing-top {
  margin-top: 2px;
}

:deep(.v-picker__actions .v-btn) {
  text-transform: none;
  padding: 0 16px;
}
</style>
