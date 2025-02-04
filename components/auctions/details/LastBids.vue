<template>
  <div class="mt-5">
    <div class="font-weight-semibold text-primary">
      Últimos lances
      <LastBidsDialog :bids="bids"/>
    </div>
    <LastBidsTable :bids="bids.slice(0,3)"/>
  </div>
</template>
<script setup lang="ts">
import LastBidsDialog from "@/components/auctions/details/LastBidsDialog.vue";
import LastBidsTable from "@/components/auctions/details/LastBidsTable.vue";

defineProps({
  bids: {
    type: Array as () => { user: string; date: string; value: string }[],
    required: true,
  },
});
</script>

