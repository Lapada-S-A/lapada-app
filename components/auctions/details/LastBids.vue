<template>
  <div class="mt-5">
    <div class="font-weight-semibold text-primary">
      Últimos lances
      <LastBidsDialog v-if="bids.length > 0" :bids="bids" />
    </div>
    <LastBidsTable v-if="bids.length > 0" :bids="bids.slice(0, 3)" />
    <div v-else class="mt-4 text-font-60 font-normal text-center">Nenhum lance foi feito até o momento.</div>
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
