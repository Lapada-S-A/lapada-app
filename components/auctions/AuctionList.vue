<template>
  <div>
    <AuctionSearch v-model:search-query="searchQuery" />

    <div
      v-if="filteredAuctions.length === 0"
      class="d-flex justify-center mt-16"
    >
      <div class="no-results-card d-flex flex-column align-center justify-center pa-6 mt-8" max-width="400">
        <v-icon size="125" color="secondary">mdi-magnify</v-icon>
        <div class="mt-4 font-subtitle font-weight-semibold text-secondary text-center">Nenhum leilão encontrado</div>
      </div>
    </div>

    <div v-else>
      <div class="d-flex flex-wrap ga-4">
        <div v-for="auction in filteredAuctions" :key="auction.title">
          <AuctionCard
            :title="auction.title"
            :type="auction.type"
            :remaining-time="auction.remainingTime"
            :highest-bid="auction.highestBid"
          />
        </div>
      </div>

      <div class="d-flex justify-center ga-2 mt-16">
        <v-btn id="previous-auctions-page-btn" class="btn btn-secondary font-small" height="32" width="85">
          Anterior
        </v-btn>
        <v-btn id="next-auctions-page-btn" class="btn btn-primary font-small" height="32" width="85">
          Próxima
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionCard from "~/components/auctions/AuctionCard.vue";
import AuctionSearch from "~/components/auctions/AuctionSearch.vue";

const auctions = [
  {
    title: "Pintura de Paisagem do Século XIX",
    type: "Leilão invertido",
    remainingTime: 97645,
    highestBid: 2800000000,
  },
  {
    title: "Escultura de Mármore",
    type: "Leilão tradicional",
    remainingTime: 2456,
    highestBid: 0,
  },
  {
    title: "Relógio de Ouro Antigo",
    type: "Leilão por proximidade",
    remainingTime: 34567,
    highestBid: 500000,
  },
  {
    title: "Carro Clássico",
    type: "Leilão invertido",
    remainingTime: 0,
    highestBid: 12000,
  },
];

const searchQuery = ref("");

const filteredAuctions = computed(() => {
  return auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
.no-results-card {
  background-color: rgba(var(--v-theme-font-10), 0.7);
  border-radius: 6px;
}
</style>
