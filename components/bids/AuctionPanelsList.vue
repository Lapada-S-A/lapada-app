<template>
  <div>
    <div
      v-if="auctionsStore.loading"
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
      <div
        v-if="filteredAuctions.length === 0"
        class="d-flex justify-center mt-16"
      >
        <div
          class="no-results-card d-flex flex-column align-center justify-center pa-6 mt-8"
          max-width="400"
        >
          <v-icon size="125" color="secondary">mdi-thumb-down-outline</v-icon>
          <div
            class="mt-4 font-subtitle font-weight-semibold text-secondary text-center"
          >
            Nenhum lance encontrado
          </div>
        </div>
      </div>

      <v-expansion-panels v-else v-model="openedAuctionId" variant="accordion">
        <div
          v-for="auction in filteredAuctions"
          :key="auction.id"
          class="w-100 mb-1"
        >
          <AuctionPanel
            :auction="auction"
            :is-opened="openedAuctionId === auction.id"
          />
        </div>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionPanel from "~/components/bids/AuctionPanel.vue";
import type { Auction } from "~/interfaces/auction";

const componentProps = defineProps<{ statusId?: number }>();

const auctionsStore = useAuctionsStore();
const openedAuctionId = ref<number | null>(null);
const auctions = ref<Auction[]>([]);

onMounted(async () => {
  const response = await auctionsStore.getAllAuctions();
  if (response) {
    auctions.value = response.items;
  }
});

const filteredAuctions = computed(() => {
  return componentProps.statusId !== undefined
    ? auctions.value.filter(
        (auction: Auction) => auction.status === componentProps.statusId
      )
    : auctions.value;
});
</script>
