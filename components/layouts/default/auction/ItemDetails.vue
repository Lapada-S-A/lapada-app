<template>
  <DefaultMainCard>
    <v-btn
      v-if="showBackButton"
      class="mb-7 text-font-100 font-weight-bold mt-2 ml-n3"
      variant="plain"
      :ripple="false"
      @click="handleBackClick"
    >
      Voltar
    </v-btn>

    <v-row class="pb-5">
      <v-col cols="12" md="7">
        <v-row>
          <ImagesSlider class="mb-1" :images="images" />

          <AuctionTimer :timeUnits="timeUnits" />

          <Description :description="description" :maxChars="800" />
        </v-row>
      </v-col>

      <v-col cols="12" md="5" class="mt-n12 pl-8">
        <MainDetails
          :title="title"
          :auctionType="auctionType"
          :category="category"
          :date="date"
          :currentBid="currentBid"
          :minIncrement="minIncrement"
        />

        <LastBids :bids="bids" />

        <SellerCard
          :name="'Matheus Sousa'"
          :avatar-initials="'MS'"
          :rating="4.8"
          :auctions-count="50"
          :since="2020"
          class="py-5"
        />
      </v-col>
    </v-row>
  </DefaultMainCard>
</template>

<script setup lang="ts">
import DefaultMainCard from "@/components/layouts/default/MainCard.vue";
import AuctionTimer from "./AuctionTimer.vue";
import Description from "./Description.vue";
import ImagesSlider from "./ImagesSlider.vue";
import LastBids from "./LastBids.vue";
import MainDetails from "./MainDetails.vue";
import SellerCard from "./SellerCard.vue";

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
</script>

<style scoped>
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
</style>
