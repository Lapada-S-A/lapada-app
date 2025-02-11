<template>
  <div>
    <div
      v-if="loading"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular
        indeterminate
        class="mt-16 pt-16"
        color="secondary"
        size="70"
        width="6"
      />
    </div>
    <div v-else>
      <AuctionsMaintain :auction="auction" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Auction } from "~/interfaces/auction";

const route = useRoute();
const { id } = route.params;
const auctionsStore = useAuctionsStore();
const auction = ref<Auction>();
const loading = ref<boolean>(false)

onBeforeMount(async () => {
  loading.value = true;
  const response = await auctionsStore.getAuctionById(+id);
  if (response) {
    auction.value = response;
  }
  loading.value = false;
});
</script>
