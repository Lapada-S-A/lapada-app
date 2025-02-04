<template>
  <div>
    <MainCard>
      <div class="h-100">
        <AuctionFilterOptions v-model:status-selected="statusIdSelected" />
        <AuctionPanelsList :status-id="statusIdSelected" />
      </div>
    </MainCard>
  </div>
</template>

<script setup lang="ts">
import MainCard from "~/components/common/MainCard.vue";
import AuctionFilterOptions from "~/components/bids/AuctionFilterOptions.vue";
import AuctionPanelsList from "~/components/bids/AuctionPanelsList.vue";

const statusIdSelected = ref<number>();
</script>
