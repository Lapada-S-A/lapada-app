<template>
  <div>
    <MainCard>
      <AuctionFilterOptions />
      <AuctionPanelsList />
    </MainCard>
  </div>
</template>

<script setup lang="ts">
import MainCard from "~/components/common/MainCard.vue";
import AuctionFilterOptions from "~/components/bids/AuctionFilterOptions.vue";
import AuctionPanelsList from "~/components/bids/AuctionPanelsList.vue";
</script>
