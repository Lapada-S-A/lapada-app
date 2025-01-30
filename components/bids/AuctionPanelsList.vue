<template>
  <div>
    <v-expansion-panels v-model="openedAuctionId" variant="accordion">
      <div v-for="auction in auctions" :key="auction.id" class="w-100 mb-1">
        <AuctionPanel
          :auction="auction"
          :is-opened="openedAuctionId === auction.id"
        />
      </div>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import AuctionPanel from "~/components/bids/AuctionPanel.vue";

const openedAuctionId = ref();
const auctions: Auction[] = [
  {
    id: 1,
    title: "Pintura de Paisagem do Século XIX",
    type: "Leilão invertido",
    startDate: "30/01/2024",
    remainingTime: 97645,
    highestBid: 2800000000,
  },
  {
    id: 2,
    title: "Escultura de Mármore",
    type: "Leilão tradicional",
    startDate: "30/01/2024",
    remainingTime: 2456,
    highestBid: 0,
  },
  {
    id: 3,
    title: "Relógio de Ouro Antigo",
    type: "Leilão por proximidade",
    startDate: "30/01/2024",
    remainingTime: 34567,
    highestBid: 500000,
  },
  {
    id: 4,
    title: "Carro Clássico",
    type: "Leilão invertido",
    startDate: "30/01/2024",
    remainingTime: 0,
    highestBid: 12000,
  },
];
</script>
