<template>
  <MainCard>
    <div class="px-6">
      <v-btn
        v-if="showBackButton"
        class="mb-7 text-font-100 font-large font-weight-bold text-none ml-n5"
        variant="plain"
        :ripple="false"
        @click="$router.back()"
      >
        Voltar
      </v-btn>

      <v-row class="pb-5">
        <v-col cols="12" md="7">
          <v-row>
            <ImagesSlider :images="images" />

            <AuctionTimer :remaining-time="remainingTime" />

            <Description :description="description" :max-chars="800" />
          </v-row>
        </v-col>

        <v-col cols="12" md="5" class="mt-n16 pl-16">
          <MainDetails
            :title="title"
            :auction-type="auctionType"
            :category="category"
            :date="date"
            :current-bid="currentBid"
            :min-increment="minIncrement"
            :auction-id="auctionId"
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
    </div>
  </MainCard>
</template>

<script setup lang="ts">
import AuctionTimer from "@/components/auctions/details/AuctionTimer.vue";
import Description from "@/components/auctions/details/Description.vue";
import ImagesSlider from "@/components/auctions/details/ImagesSlider.vue";
import LastBids from "@/components/auctions/details/LastBids.vue";
import MainDetails from "@/components/auctions/details/MainDetails.vue";
import SellerCard from "@/components/auctions/details/SellerCard.vue";
import MainCard from "@/components/common/MainCard.vue";
import type { Bid } from "~/interfaces/bid";

const props = defineProps({
  title: { type: String, required: true },
  auctionType: { type: String, default: "Leilão Comum" },
  category: { type: String, required: true },
  date: { type: String, required: true },
  currentBid: { type: String, required: true },
  minIncrement: { type: String, required: true },
  remainingTime: { type: Number, required: true },
  images: { type: Array as () => string[], required: true },
  description: { type: String, required: true },
  bids: {
    type: Array as () => Bid[],
    required: true,
  },
  showBackButton: { type: Boolean, default: true },
  auctionId: { type: Number, required: true },
});

onMounted(() => {
  console.log(props.remainingTime);
});
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
