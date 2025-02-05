<template>
  <div>
    <div class="text-primary font-weight-bold font-title mb-1">{{ auctionType }}</div>
    <div class="font-weight-bold text-font-100 font-bigtitle">{{ title }}</div>
    <div class="text-font-60 font-small mb-1">{{ category }}</div>
    <div class="text-font-100">{{ date }}</div>
    <v-row class="mt-1">
      <v-col cols="12">
        <div class="font-weight-semibold text-primary">Lance atual</div>
        <div class="text-bid text-font-100 font-weight-bold ml-n1 mt-n3">{{ currentBid }}</div>
        <div class="text-font-60 mt-n1">Incremento mín.: {{ minIncrement }}</div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center mt-4 mb-5">
        <CreateBidDialog />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import CreateBidDialog from "@/components/auctions/details/CreateBidDialog.vue";

defineProps({
  title: { type: String, required: true },
  auctionType: { type: String, default: "Leilão Comum" },
  category: { type: String, required: true },
  date: { type: String, required: true },
  currentBid: { type: String, required: true },
  minIncrement: { type: String, required: true },
});
</script>

<style scoped>
.text-bid {
  font-size: 4.5rem;
}

.button-custom {
  width: 350px;
  height: 70px !important;
}
</style>
