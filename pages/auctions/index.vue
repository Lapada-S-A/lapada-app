<template>
  <div class="d-flex flex-wrap ga-4">
    <div v-for="auction in auctions" :key="auction.title">
      <AuctionCard
        :title="auction.title"
        :type="auction.type"
        :remaining-time="auction.remainingTime"
        :highest-bid="auction.highestBid"
        :width="auction.width"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionCard from "~/components/auctions/AuctionCard.vue";

const auctions = [
  {
    title: "Pintura de Paisagem do Século XIX",
    type: "Leilão invertido",
    remainingTime: "2d3h",
    highestBid: "280.000",
  },
  {
    title: "Escultura de Mármore",
    type: "Leilão tradicional",
    remainingTime: "5h30m",
    highestBid: "150.000",
  },
  {
    title: "Relógio de Ouro Antigo",
    type: "Leilão por proximidade",
    remainingTime: "1d12h",
    highestBid: "500.000",
  },
  {
    title: "Carro Clássico",
    type: "Leilão invertido",
    remainingTime: "3d1h",
    highestBid: "1.200.000",
  },
];
</script>
