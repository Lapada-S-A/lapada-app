<template>
  <div class="h-100">
    <div v-if="auctionsStore.loading || typesStore.loading" class="h-75 d-flex align-center justify-center">
      <CommonLoading :size="70" :width="6" />
    </div>
    <div v-else class="h-100">
      <div
        v-if="filteredAuctions.length === 0"
        class="d-flex justify-center h-75"
      >
        <CommonNoItemsFound :icon="'mdi-thumb-down-outline'" :message="'Nenhum lance encontrado'" />
      </div>
      <div v-else class="d-flex flex-column justify-space-between h-100">
        <v-expansion-panels v-model="openedAuctionId" variant="accordion">
          <div
            v-for="auctionResponse in filteredAuctions"
            :key="auctionResponse.auction.id"
            class="w-100 mb-1"
          >
            <AuctionPanel
              :auction="auctionResponse.auction"
              :photo="auctionResponse.document"
              :is-opened="openedAuctionId === auctionResponse.auction.id"
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
import type { AuctionResponse } from "~/interfaces/auction";

const componentProps = defineProps<{ statusId?: number }>();
const typesStore = useTypesStore();
const auctionsStore = useAuctionsStore();
const userStore = useUserStore();
const openedAuctionId = ref<number | null>(null);
const auctionResponses = ref<AuctionResponse[]>([]);
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
    auctionResponses.value = response.items;
    totalPages.value = response.pagination.pages;
  }
};

onMounted(() => {
  fetchAuctions();
  typesStore.getAllTypes();
});

const filteredAuctions = computed(() => {
  return componentProps.statusId !== undefined
    ? auctionResponses.value.filter(
        (auctionResponse: AuctionResponse) =>
          auctionResponse.auction.status === componentProps.statusId!
      )
    : auctionResponses.value;
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
