<template>
  <div class="mt-5">
    <div class="font-weight-semibold text-primary">
      Últimos lances
      <LastBidsDialog :bids="bids" />
    </div>
    <LastBidsTable :bids="bids.slice(0, 3)" />
  </div>
</template>
<script setup lang="ts">
import LastBidsDialog from "@/components/auctions/details/LastBidsDialog.vue";
import LastBidsTable from "@/components/auctions/details/LastBidsTable.vue";
import type { Bid } from "~/interfaces/bid";

defineProps({
  bids: {
    type: Array as () => Bid[],
    required: true,
  },
});
</script>
