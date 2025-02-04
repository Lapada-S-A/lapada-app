<template>
  <v-expansion-panel
    :value="auction.id"
    rounded="0"
    elevation="0"
    :color="isOpened ? 'primary' : 'primary-60'"
    height="72"
  >
    <AuctionPanelTitle :auction="auction" :is-opened="isOpened" />
    <AuctionPanelText :auction="auction" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import AuctionPanelTitle from "~/components/bids/AuctionPanelTitle.vue";
import AuctionPanelText from "~/components/bids/AuctionPanelText.vue";
import type { Auction } from "~/interfaces/auction";

defineProps<{
  auction: Auction;
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
