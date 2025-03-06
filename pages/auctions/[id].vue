<template>
  <div>
    <AuctionDetails
      v-if="auction && !loading"
      :title="auction.title"
      :auction-type="auctionType?.name"
      :category="categoriesStore.categories.map((category, index) => {
      return auction!.categories.includes(category.id)
        ? (index === auction!.categories.length - 1 ? category.name + ', ' : category.name)
        : '';
    }).join('')"
      :date="auction.created_date ? formatDate(auction.created_date) : ''"
      :current-bid="
        formatCurrency(auction.highest_bid || auction.initial_value)
      "
      :min-increment="formatCurrency(auction.min_increment)"
      :remaining-time="
        auction.created_date && auction.end_date
          ? calculateRemainingTimeInSeconds(
              auction.created_date,
              auction.end_date
            )
          : 0
      "
      :description="auction.description"
      :images="auctionData.images"
      :bids="auctionBids || []"
      :auction-id="auctionId"
      :auction-status="auction.status"
      :show-back-button="true"
    />
    <div v-else class="d-flex justify-center align-center">
      <v-progress-circular
        indeterminate
        class="mt-16 pt-16"
        color="secondary"
        size="70"
        width="6"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuctionDetails from "@/components/auctions/details/index.vue";
import type { Auction } from "~/interfaces/auction";
import type { Bid } from "~/interfaces/bid";
import type { Type } from "~/interfaces/type";

const route = useRoute();
const auctionId = Number(route.params.id);
const auctionsStore = useAuctionsStore();
const bidsStore = useBidsStore();
const typesStore = useTypesStore();
const categoriesStore = useCategoriesStore();

const auctionType = ref<Type>();
const auction = ref<Auction>();
const auctionBids = ref<Bid[]>();
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  await categoriesStore.getAllCategories();
  await typesStore.getAllTypes();
  auction.value = await auctionsStore.getAuctionById(auctionId);
  auctionBids.value = await bidsStore.getBidsByAuctionId(auctionId);
  auctionType.value = typesStore.getTypeById(auction.value?.type_id || 0);
  loading.value = false;
});

const auctionData = {
  images: [
    "https://cdn.motor1.com/images/mgl/jlw7Ne/s1/bmw-m5-2024-im-test.jpg",
    "https://cdn.motor1.com/images/mgl/jlwrMo/s1/novo-bmw-serie-3-2027---projecao.jpg",
    "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/03/BMW-iX1eDrive20-xLine-e1710447790402.jpeg",
    "https://i.ytimg.com/vi/B3sh4cjPs88/maxresdefault.jpg",
  ],
};

function parseCustomDate(dateString: string): Date {
  const parts = dateString.split("-");
  if (parts.length < 3) return new Date(NaN);

  const [day, month, year, hour, minute, second] = parts.map(Number);
  return new Date(year, month - 1, day, hour || 0, minute || 0, second || 0);
}

function calculateRemainingTimeInSeconds(
  startDate: string,
  endDate: string
): number {
  const start = parseCustomDate(startDate).getTime();
  const end = parseCustomDate(endDate).getTime();
  const diff = end - start;
  if (diff <= 0) return 0;

  return Math.floor(diff / 1000);
}

function formatDate(dateString: string): string {
  if (!dateString) return "";

  const parsedDate = parseCustomDate(dateString);
  if (!parsedDate || isNaN(parsedDate.getTime())) return "Data inválida";

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
}
</script>
