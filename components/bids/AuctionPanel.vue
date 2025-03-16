<template>
  <v-expansion-panel
    :value="auction.id"
    rounded="0"
    elevation="0"
    :color="isOpened ? 'primary' : 'primary-60'"
    height="80"
  >
    <AuctionPanelTitle :auction="auction" :is-opened="isOpened" />
    <AuctionPanelText :auction="auction" :photo="photo" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import AuctionPanelTitle from "~/components/bids/AuctionPanelTitle.vue";
import AuctionPanelText from "~/components/bids/AuctionPanelText.vue";
import type { Auction, AuctionPhotosResponse } from "~/interfaces/auction";

defineProps<{
  auction: Auction;
  photo: AuctionPhotosResponse;
  isOpened: boolean;
}>();
</script>

<style scoped>
:deep(.v-expansion-panel-title--active .v-expansion-panel-title__icon) {
  color: rgba(var(--v-theme-font-10));
}

:deep(.v-expansion-panel-title__icon) {
  color: rgba(var(--v-theme-primary));
}
</style>
