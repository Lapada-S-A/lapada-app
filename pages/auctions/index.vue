<template>
  <div>
    <div class="d-flex flex-wrap ga-4">
    <div v-for="auction in auctions" :key="auction.title">
      <AuctionCard
        :title="auction.title"
        :type="auction.type"
        :remaining-time="auction.remainingTime"
        :highest-bid="auction.highestBid"
      />
    </div>
  </div>
  <div class="d-flex justify-center ga-2 mt-16">
    <v-btn class="btn btn-secondary font-small" height="32" width="85">Anterior</v-btn>
    <v-btn class="btn btn-primary font-small" height="32" width="85">Próxima</v-btn>
  </div>
  </div>
</template>

<script setup lang="ts">
import AuctionCard from "~/components/auctions/AuctionCard.vue";

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
</script>
