<template>
  <div class="h-100">
    <div v-if="loading" class="d-flex justify-center align-center h-75">
      <CommonLoading :size="70" :width="6" />
    </div>
    <div v-else>
      <AuctionsMaintain :auction="auction" :photos="photos" :edit="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Auction, AuctionPhotosResponse } from "~/interfaces/auction";

const route = useRoute();
const { id } = route.params;
const auctionsStore = useAuctionsStore();
const auction = ref<Auction>();
const photos = ref<AuctionPhotosResponse[]>([]);
const loading = ref<boolean>(false);

onBeforeMount(async () => {
  loading.value = true;
  const response = await auctionsStore.getAuctionById(+id);
  if (response) {
    auction.value = response.auction;
    photos.value = response.documents;
  }
  loading.value = false;
});
</script>
