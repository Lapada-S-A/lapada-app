<template>
  <div>
    <div v-if="!isSeller">
      <AuctionSearch
        v-model:search-query="searchQuery"
        @apply-filters="updateFilters"
      />
    </div>
    <div v-else class="mt-2 mb-8 d-flex align-center justify-space-between">
      <AuctionStatusOptions
        @update:status-selected="(event) => (auctionStatusIdSelected = event)"
      />
      <v-btn
        class="btn btn-primary"
        width="160"
        height="40"
        @click="$router.push('/auctions/new')"
      >
        <div class="d-flex align-center ga-3">
          <v-icon size="20">mdi-plus</v-icon>Criar leilão
        </div>
      </v-btn>
    </div>

    <div
      v-if="
        auctionsStore.loading || typesStore.loading || categoriesStore.loading
      "
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
        v-if="filteredAuctions.length === 0 && !auctionsStore.loading"
        class="d-flex justify-center mt-16"
      >
        <div
          class="d-flex flex-column align-center justify-center pa-6 mt-8"
          max-width="400"
        >
          <v-icon size="125" color="secondary"
            >mdi-shopping-search-outline</v-icon
          >
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
            <AuctionCard :auction="auction" :show-status="isSeller" />
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
  </div>
</template>

<script setup lang="ts">
import AuctionCard from "~/components/auctions/AuctionCard.vue";
import AuctionSearch from "~/components/auctions/AuctionSearch.vue";
import AuctionStatusOptions from "~/components/auctions/AuctionStatusOptions.vue";
import type { Auction } from "~/interfaces/auction";
import type { FilterData } from "~/interfaces/auction-filter";
import { AuctionStatus } from "~/stores/enum";

const componentProps = defineProps<{ isSeller?: boolean }>();
const auctionsStore = useAuctionsStore();
const categoriesStore = useCategoriesStore();
const typesStore = useTypesStore();
const userStore = useUserStore();
const auctions = ref<Auction[]>([]);
const auctionStatusIdSelected = ref<AuctionStatus>();
const auctionsPerPage = ref<number>(18);
const currentPage = ref<number>(1);
const totalAuctions = ref<number>(0);
const filters = ref({});
const isLoading = ref(false);
const totalPages = computed(() =>
  Math.ceil(totalAuctions.value / auctionsPerPage.value)
);
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

onBeforeMount(async () => {
  await fetchAuctions();
  await categoriesStore.getAllCategories();
  await typesStore.getAllTypes();
});

const searchQuery = ref("");

const filteredAuctions = computed(() => {
  let filtered = auctions.value.filter(
    (auction: Auction) =>
      auction.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (!componentProps.isSeller
        ? auction.status.toString() === AuctionStatus.OPEN.toString()
        : true) &&
      (componentProps.isSeller
        ? auction.seller_id === userStore.currentUser?.id
        : auction.seller_id !== userStore.currentUser?.id)
  );

  if (auctionStatusIdSelected.value) {
    filtered = filtered.filter(
      (auction: Auction) => +auction.status === auctionStatusIdSelected.value
    );
  }
  return filtered;
});

const formatDateTimeForRequest = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const fetchAuctions = async () => {
  isLoading.value = true;
  auctions.value = [];

  const response = await auctionsStore.getAuctionsPaginated({
    page: currentPage.value.toString(),
    per_page: auctionsPerPage.value.toString(),
    search: searchQuery.value,
    ...filters.value,
  });

  if (response) {
    auctions.value = response.items;
    totalAuctions.value = response.pagination.total;
  }
  isLoading.value = false;
};

watch(
  filters,
  () => {
    currentPage.value = 1;
    fetchAuctions();
  },
  { deep: true }
);

watch(
  () => searchQuery.value,
  (newQuery) => {
    if (searchTimeout) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      const localResults = auctions.value.filter((auction: Auction) =>
        auction.title.toLowerCase().includes(newQuery.toLowerCase())
      );

      if (localResults.length > 0) {
        return;
      }

      currentPage.value = 1;
      await fetchAuctions();
    }, 2000);
  }
);

const isLastPage = computed(() => currentPage.value >= totalPages.value);

const changePage = (direction: string) => {
  if (direction === "previous" && currentPage.value > 1) {
    currentPage.value--;
  } else if (direction === "next" && currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  fetchAuctions();
};

const updateFilters = (filterData: FilterData) => {
  const transformedFilters = transformToSnakeCase(filterData);
  if (
    transformedFilters.end_date &&
    transformedFilters.end_date instanceof Date
  ) {
    transformedFilters.end_date = formatDateTimeForRequest(
      transformedFilters.end_date
    );
  }
  filters.value = { ...transformedFilters };
};
</script>
