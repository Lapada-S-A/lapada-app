<template>
  <AuctionDetails
    v-if="auction"
    :title="auction.title"
    :auction-type="auctionType?.name"
    :category="auction.categories.map((category) => category.name).join(', ')"
    :date="auction.created_date ? formatDate(auction.created_date) : ''"
    :current-bid="formatCurrency(auction.highest_bid || auction.initial_value)"
    :min-increment="formatCurrency(auction.min_increment)"
    :remaining-time="
      auction.created_date && auction.end_date
        ? calculateRemainingTime(auction.created_date, auction.end_date)
        : 'N/A'
    "
    :description="auction.description"
    :images="auctionData.images"
    :bids="auctionBids || []"
    :auction-id="auctionId"
    :show-back-button="true"
  />
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

const auctionType = ref<Type>();
const auction = ref<Auction>();
const auctionBids = ref<Bid[]>();

onMounted(async () => {
  auction.value = await auctionsStore.getAuctionById(auctionId);
  auctionBids.value = await bidsStore.getBidsByAuctionId(auctionId);
  auctionType.value = typesStore.getTypeById(auction.value?.type_id || 0);
});

const auctionData = {
  images: [
    "https://cdn.motor1.com/images/mgl/jlw7Ne/s1/bmw-m5-2024-im-test.jpg",
    "https://cdn.motor1.com/images/mgl/jlwrMo/s1/novo-bmw-serie-3-2027---projecao.jpg",
    "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/03/BMW-iX1eDrive20-xLine-e1710447790402.jpeg",
    "https://i.ytimg.com/vi/B3sh4cjPs88/maxresdefault.jpg",
  ],
};

const calculateRemainingTime = (startDate: string, endDate: string): string => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const diff = end - start;

  if (diff <= 0) return "Encerrado";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const parsedDate = Date.parse(dateString)
    ? new Date(dateString)
    : parseCustomDate(dateString);

  if (!parsedDate || isNaN(parsedDate.getTime())) return "Data inválida";

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
};

const parseCustomDate = (dateString: string): Date => {
  const parts = dateString.split("-");
  if (parts.length < 3) return new Date(NaN);

  const [day, month, year, hour, minute, second] = parts.map(Number);
  return new Date(year, month - 1, day, hour || 0, minute || 0, second || 0);
};
</script>
