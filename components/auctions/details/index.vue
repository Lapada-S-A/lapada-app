<template>
  <MainCard>
    <div class="px-6">
      <v-row class="pb-5">
        <v-col cols="12" md="7">
          <div class="d-flex justify-space-between">
            <v-btn
              v-if="showBackButton"
              class="mb-7 text-font-100 font-large font-weight-bold text-none ml-n5"
              variant="plain"
              :ripple="false"
              @click="$router.back()"
            >
              Voltar
            </v-btn>
            <v-btn
              v-if="
                isSeller &&
                (auctionStatus === AuctionStatus.OPEN ||
                  auctionStatus === AuctionStatus.PENDING)
              "
              class="mb-7 text-font-100 font-large font-weight-bold text-none mr-n2"
              variant="plain"
              :ripple="false"
              @click="$router.push(`/auctions/edit/${auctionId}`)"
            >
              Editar
            </v-btn>
          </div>
          <v-row>
            <ImagesSlider :images="images" />

            <AuctionTimer
              :remaining-time="remainingTime"
              :auction-status="auctionStatus"
            />

            <Description :description="description" :max-chars="800" />
          </v-row>
        </v-col>

        <v-col cols="12" md="5" class="pl-16">
          <MainDetails
            :title="title"
            :auction-type="auctionType"
            :category="category"
            :date="date"
            :current-bid="currentBid"
            :current-bid-buyer-id="currentBidBuyerId ?? 0"
            :min-increment="minIncrement"
            :auction-id="auctionId"
            :auction-status="auctionStatus"
            :is-seller="isSeller"
            :has-bids="bids.length > 0"
            @refresh-auction-details="refreshAuction"
          />

          <LastBids :bids="bids" />

          <SellerCard
            :name="sellerData?.username || ''"
            :avatar-initials="
              sellerData?.username
                ? sellerData.username
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                : ''
            "
            :rating="sellerData?.rating"
            :auctions-count="sellerData?.auctionsCreated.length || 0"
            :since="new Date(sellerData?.created_at || '').getFullYear()"
            class="py-5"
          />
        </v-col>
      </v-row>
    </div>
  </MainCard>
</template>

<script setup lang="ts">
import AuctionTimer from "@/components/auctions/details/AuctionTimer.vue";
import Description from "@/components/auctions/details/Description.vue";
import ImagesSlider from "@/components/auctions/details/ImagesSlider.vue";
import LastBids from "@/components/auctions/details/LastBids.vue";
import MainDetails from "@/components/auctions/details/MainDetails.vue";
import SellerCard from "@/components/auctions/details/SellerCard.vue";
import MainCard from "@/components/common/MainCard.vue";
import type { Bid } from "~/interfaces/bid";
import type { UserSellerData } from "~/interfaces/user";
import type { AuctionStatus } from "~/stores/enum";

const props = defineProps({
  title: { type: String, required: true },
  auctionType: { type: String, default: "Leilão Comum" },
  category: { type: String, required: true },
  date: { type: String, required: true },
  currentBid: { type: String, required: true },
  minIncrement: { type: String, required: true },
  remainingTime: { type: Number, required: true },
  images: { type: Array as () => string[], required: true },
  description: { type: String, required: true },
  bids: {
    type: Array as () => Bid[],
    required: true,
  },
  showBackButton: { type: Boolean, default: true },
  auctionId: { type: Number, required: true },
  auctionStatus: { type: Number, required: true },
});

const reviewStore = useReviewStore();
const auctionsStore = useAuctionsStore();
const userStore = useUserStore();
const bidsStore = useBidsStore();

const isSeller = ref<boolean>(false);
const sellerData = ref<UserSellerData>();
const auctionStatus = ref<AuctionStatus>(props.auctionStatus);
const bids = ref<Bid[]>(props.bids);

onMounted(async () => {
  const auction = await auctionsStore.getAuctionById(props.auctionId);

  if (auction?.seller_id !== undefined) {
    const allAuctions = await auctionsStore.getAuctionsBySeller(
      auction.seller_id
    );
    isSeller.value = auction.seller_id === userStore.currentUser?.id;
    const sellerInfo = await userStore.getClientById(auction.seller_id);
    const sellerRating = await reviewStore.getAverageRatingOfSeller(
      auction.seller_id
    );

    if (sellerInfo !== undefined) {
      sellerData.value = {
        ...sellerInfo,
        username: sellerInfo?.username || "",
        email: sellerInfo?.email || "",
        password: sellerInfo?.password || "",
        cpf: sellerInfo?.cpf || "",
        phone_number: sellerInfo?.phone_number || "",
        rating: sellerRating || { average_rating: "0" },
        auctionsCreated: allAuctions || [],
        type_user: sellerInfo?.type_user || UserTypes.Seller,
        birthdate: sellerInfo?.birthdate || "",
      };
    }
  }
});

const currentBidBuyerId = computed(() => {
  return bids.value?.find((bid) => bid.bid_status === BidStatus.ACTIVE)
    ?.buyer_id;
});

watch(
  () => props.bids,
  (newBids) => {
    if (newBids.length > 0) {
      bids.value = newBids;
    }
  },
  { immediate: true }
);

async function refreshAuction(status: AuctionStatus) {
  const updatedAuction = await bidsStore.getBidsByAuctionId(props.auctionId);
  if (updatedAuction) {
    bids.value = updatedAuction || [];
    auctionStatus.value = status;
  }
}
</script>

<style scoped>
.v-btn--variant-plain {
  padding: 0 !important;
  opacity: 1 !important;
}

.text-bid {
  font-size: 4.5rem;
}

.button-custom {
  width: 350px;
  height: 70px !important;
}
</style>
