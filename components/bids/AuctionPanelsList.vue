<template>
  <div class="h-100">
    <div
      v-if="auctionsStore.loading || typesStore.loading"
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
    <div v-else class="h-100">
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
      <div v-else class="d-flex flex-column justify-space-between h-100">
        <v-expansion-panels v-model="openedAuctionId" variant="accordion">
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
        <div
          v-if="!auctionsStore.loading"
          class="d-flex justify-center ga-2 mb-16"
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
  </div>
</template>

<script setup lang="ts">
import AuctionPanel from "~/components/bids/AuctionPanel.vue";
import type { Auction } from "~/interfaces/auction";

const componentProps = defineProps<{ statusId?: number }>();
const typesStore = useTypesStore();
const auctionsStore = useAuctionsStore();
const userStore = useUserStore();
const openedAuctionId = ref<number | null>(null);
const auctions = ref<Auction[]>([]);
const auctionsPerPage = ref<number>(10);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);

const fetchAuctions = async () => {
  const response = await auctionsStore.getAuctionsByBuyer(
    userStore.currentUser!.id!,
    {
      page: currentPage.value.toString(),
      per_page: auctionsPerPage.value.toString(),
    }
  );
  if (response) {
    auctions.value = response.auctions;
    totalPages.value = response.pages;
  }
};

onMounted(() => {
  fetchAuctions();
  typesStore.getAllTypes();
});

const filteredAuctions = computed(() => {
  return componentProps.statusId !== undefined
    ? auctions.value.filter(
        (auction: Auction) => auction.status === componentProps.statusId!
      )
    : auctions.value;
});

const isLastPage = computed(() => currentPage.value >= totalPages.value);

const changePage = (direction: string) => {
  if (direction === "previous" && currentPage.value > 1) {
    currentPage.value--;
  } else if (direction === "next" && currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  fetchAuctions();
};

watch(
  () => componentProps.statusId,
  () => {
    openedAuctionId.value = null;
  }
);
</script>
