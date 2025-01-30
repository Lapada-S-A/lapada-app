<template>
  <div>
    <h2 class="text-primary">{{ auctionType }}</h2>
    <h1 class="font-weight-bold text-font-100">{{ title }}</h1>
    <p class="text-font-60 text-caption">{{ category }}</p>
    <p class="text-font-100">{{ date }}</p>
    <v-row class="mt-1">
      <v-col cols="12">
        <p class="font-weight-bold text-h7 text-primary">Lance atual</p>
        <h1 class="text-bid text-font-100 ml-n1">{{ currentBid }}</h1>
        <p class="text-font-60">Incremento mín.: {{ minIncrement }}</p>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn
          class="button-custom rounded-lg font-weight-bold"
          size="x-large"
          color="primary"
        >
          Fazer lance
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
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
