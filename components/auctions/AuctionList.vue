<template>
  <div>
    <AuctionSearch v-model:search-query="searchQuery" />

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
      ></v-progress-circular>
    </div>

    <div
      v-if="filteredAuctions.length === 0 && !auctionsStore.loading"
      class="d-flex justify-center mt-16"
    >
      <div
        class="no-results-card d-flex flex-column align-center justify-center pa-6 mt-8"
        max-width="400"
      >
        <v-icon size="125" color="secondary">mdi-magnify</v-icon>
        <div
          class="mt-4 font-subtitle font-weight-semibold text-secondary text-center"
        >
          Nenhum leilão encontrado
        </div>
      </div>
    </div>

    <div v-else>
      <div class="d-flex flex-wrap ga-4">
        <div v-for="auction in filteredAuctions" :key="auction.title">
          <AuctionCard :auction="auction" />
        </div>
      </div>

      <div
        v-if="!auctionsStore.loading"
        class="d-flex justify-center ga-2 mt-16 mb-5"
      >
        <v-btn
          id="previous-auctions-page-btn"
          class="btn btn-secondary font-small"
          height="32"
          width="85"
          :class="{ 'btn-disabled': currentPage === 1 }"
          @click="changePage('previous')"
        >
          Anterior
        </v-btn>
        <v-btn
          id="next-auctions-page-btn"
          class="btn btn-primary font-small"
          height="32"
          width="85"
          :class="{ 'btn-disabled': isLastPage }"
          @click="changePage('next')"
        >
          Próxima
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionCard from "~/components/auctions/AuctionCard.vue";
import AuctionSearch from "~/components/auctions/AuctionSearch.vue";
import type { Auction } from "~/interfaces/auction";

const auctionsStore = useAuctionsStore();
const auctions = ref<Auction[]>([]);
const auctionsPerPage = ref<number>(10);
const currentPage = ref<number>(1);
const totalAuctions = ref<number>(0);
const totalPages = computed(() =>
  Math.ceil(totalAuctions.value / auctionsPerPage.value)
);

onMounted(async () => {
  await fetchAuctions();
});

const searchQuery = ref("");

const filteredAuctions = computed(() => {
  return auctions.value.filter((auction: Auction) =>
    auction.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchAuctions = async () => {
  auctions.value = [];
  const response = await auctionsStore.getAuctionsPaginated({
    page: currentPage.value.toString(),
    per_page: auctionsPerPage.value.toString(),
  });

  if (response) {
    auctions.value = response.items;
    totalAuctions.value = response.pagination.total;
  }
};

const isLastPage = computed(() => currentPage.value >= totalPages.value);

const changePage = (direction: string) => {
  if (direction === "previous" && currentPage.value > 1) {
    currentPage.value--;
  } else if (direction === "next" && currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  fetchAuctions();
};
</script>

<style scoped>
.no-results-card {
  background-color: rgba(var(--v-theme-font-10), 0.7);
  border-radius: 6px;
}
</style>
