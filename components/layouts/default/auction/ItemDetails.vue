<template>
  <DefaultMainCard>
    <v-btn
      v-if="showBackButton"
      class="mb-4 text-font-100 font-weight-bold mt-2"
      variant="plain"
      :ripple="false"
      @click="handleBackClick"
    >
      Voltar
    </v-btn>

    <v-row>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="4">
            <v-col
              v-for="(image, index) in images"
              :key="index"
              cols="12"
              class="spacing-side-images"
            >
              <v-img
                :src="image"
                aspect-ratio="1"
                class="rounded clickable-image mb-2"
                @click="setMainImage(image)"
                contain
                height="90"
              ></v-img>
            </v-col>
          </v-col>

          <v-col cols="8">
            <v-img :src="mainImage" class="rounded mb-2 main-image"></v-img>
          </v-col>

          <v-col cols="12" class="text-center">
            <p class="font-weight-bold text-primary">Tempo restante</p>
            <v-row justify="center">
              <v-col
                v-for="(unit, index) in timeUnits"
                :key="index"
                cols="auto"
                class="text-center mt-3 text-font-100 mx-3"
              >
                <p class="font-weight-bold text-h3">
                  {{ unit.value }}
                </p>
                <p class="text-h6">{{ unit.label }}</p>
              </v-col>
            </v-row>
            <p class="text-caption mt-2 text-font-60">
              *Não serão aceitos lances após o fim desse prazo.
            </p>
          </v-col>

          <v-col cols="12" class="mt-4 mb-5">
            <h3 class="font-weight-bold text-primary">Descrição</h3>
            <p class="text-justify">
              {{ showMore ? description : truncatedDescription }}
              <span
                variant
                small
                color="primary"
                @click="toggleShowMore"
                class="open-text"
              >
                {{ showMore ? "Ver menos" : "Ver mais" }}
              </span>
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6" class="mt-n8 pl-8">
        <h2 class="text-primary">{{ auctionType }}</h2>
        <h1 class="font-weight-bold text-font-100">{{ title }}</h1>
        <p class="text-font-60 text-caption">{{ category }}</p>
        <p class="text-font-100">{{ date }}</p>
        <v-row class="mt-4">
          <v-col cols="12">
            <p class="font-weight-bold text-h7 text-primary">Lance atual</p>
            <h1 class="text-bid text-font-100">{{ currentBid }}</h1>
            <p class="text-font-60">Incremento mín.: {{ minIncrement }}</p>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              class="button-custom rounded-lg"
              size="x-large"
              color="primary"
            >
              Fazer lance
            </v-btn>
          </v-col>
        </v-row>

        <div class="mt-5">
          <h4 class="font-weight-bold text-primary">Últimos lances</h4>
          <v-table class="ml-n4 no-border">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Usuário</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bid, index) in bids" :key="index">
                <td>{{ bid.value }}</td>
                <td>{{ bid.user }}</td>
                <td>{{ bid.date }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <div class="mt-5">
          <h4 class="font-weight-bold text-primary">Vendedor</h4>
          <v-row class="mt-1">
            <v-col cols="2" class="text-center ml-n3">
              <v-avatar size="100" class="elevation-1 bg-primary">
                <h1>MS</h1>
              </v-avatar>
            </v-col>
            <v-col cols="10" class="mt-5 ml-n5">
              <div class="d-flex flex-column text-font-100">
                <h3>Matheus Sousa</h3>
                <div class="d-flex align-items-center">
                  <v-icon color="yellow"> mdi-star</v-icon>
                  <span class="ml-2 text-caption">(4.8)</span>
                </div>
                <p class="text-caption">+50 leilões desde 2022</p>
              </div>
            </v-col>
          </v-row>
          <p class="mt-2 text-caption text-font-60">
            *Operações de pagamento e logística devem ser acordadas entre as
            partes.
          </p>
        </div>
      </v-col>
    </v-row>
  </DefaultMainCard>
</template>

<script setup lang="ts">
import DefaultMainCard from "@/components/layouts/default/MainCard.vue";

const props = defineProps({
  title: { type: String, required: true },
  auctionType: { type: String, default: "Leilão Comum" },
  category: { type: String, required: true },
  date: { type: String, required: true },
  currentBid: { type: String, required: true },
  minIncrement: { type: String, required: true },
  remainingTime: { type: String, required: true },
  images: { type: Array as () => string[], required: true },
  description: { type: String, required: true },
  bids: {
    type: Array as () => { user: string; date: string; value: string }[],
    required: true,
  },
  showBackButton: { type: Boolean, default: true },
  onBackClick: { type: Function, default: null },
});

const mainImage = ref(props.images[0] || "");
const showMore = ref(false);
const maxChars = 200;

const setMainImage = (image: string) => {
  mainImage.value = image;
};

const handleBackClick = () => {
  if (props.onBackClick) {
    props.onBackClick();
  }
};

const timeUnits = [
  { value: 3, label: "dias" },
  { value: 14, label: "horas" },
  { value: 26, label: "minutos" },
  { value: 58, label: "segundos" },
];

const truncatedDescription = computed(() =>
  props.description.length > maxChars
    ? props.description.substring(0, maxChars) + "..."
    : props.description
);

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
</script>

<style scoped>
.clickable-image {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.clickable-image:hover {
  transform: scale(1.05);
}

.v-btn--variant-plain {
  padding: 0 !important;
  opacity: 80%;
}

.text-bid {
  font-size: 4.5rem;
}

.button-custom {
  width: 350px;
  height: 70px !important;
}
.v-table--density-default {
  --v-table-row-height: 4px !important;
}

.spacing-side-images {
  padding: 0 !important;
}

.main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.open-text {
  cursor: pointer;
  color: #1976d2;
  text-decoration: underline;
}
</style>
