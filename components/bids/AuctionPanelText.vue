<template>
  <v-expansion-panel-text>
    <div class="d-flex py-8 px-4">
      <div class="mr-16">
        <v-img
          src="https://picsum.photos/210/245"
          class="mb-1 rounded cursor-pointer"
          height="210"
          width="245"
          cover
          @click="$router.push(`/auctions/${auction.id}`)"
          ><template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="font-60" indeterminate />
            </div> </template
        ></v-img>
        <div class="mt-2 font-weight-bold font-large title-truncate">
          {{ auction.title }}
        </div>
        <div class="d-flex justify-space-between align-center mt-2">
          <div class="d-flex align-center font-small ga-1">
            <div
              class="d-flex align-center justify-center bg-secondary rounded-circle seller-initials text-font-10"
            >
              {{ getUserInitials(sellerName ? sellerName : "") }}
            </div>
            <div class="text-font-60">{{ sellerName }}</div>
          </div>
          <div class="font-small text-font-60">
            {{ formatDatePickerDate(sellerSince ? sellerSince : "") }}
          </div>
        </div>
      </div>

      <div
        class="d-flex flex-column ml-16 pl-8 font-subtitle font-weight-bold ga-3"
      >
        <div class="highest-bid text-primary">Lance atual:</div>
        <div>
          {{
            auction.highest_bid ? formatCurrency(auction.highest_bid) : " ---"
          }}
        </div>
      </div>

      <v-divider
        class="mx-16 opacity-100"
        length="160"
        vertical
        color="font-60"
      />

      <div class="d-flex flex-column ga-3">
        <div class="text-primary font-subtitle font-weight-bold mb-1">
          Meus lances:
        </div>
        <table class="font-weight-regular">
          <thead>
            <tr class="font-large text-font-60">
              <td>Valor</td>
              <td>Situação</td>
              <td>Data</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bid, index) in bids" :key="index" class="font-large">
              <td>{{ formatCurrency(bid.amount) }}</td>
              <td
                :class="{[`text-${getBidStatusProperties(bid.bid_status)!.color}`]: true, 'font-weight-semibold': bid.bid_status === BidStatus.WINNER}"
              >
                {{ getBidStatusProperties(bid.bid_status)!.name }}
              </td>
              <td>{{ formatDate(bid.bid_date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="hasWinnerBid" class="ml-10">
        <SellerActions :seller-id="auction.seller_id" />
      </div>
    </div>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import SellerActions from "./SellerActions.vue";
import type { Auction } from "~/interfaces/auction";
import type { Bid } from "~/interfaces/bid";
import { BidStatus } from "~/stores/enum";

const componentProps = defineProps<{
  auction: Auction;
}>();
const userStore = useUserStore();
const bidsStore = useBidsStore();
const bids = ref<Bid[]>([]);
const sellerName = ref<string>();
const sellerSince = ref<string>();

onMounted(async () => {
  const response = await bidsStore.getBidsByAuctionIdByBuyerId(
    componentProps.auction.id!,
    userStore.currentUser!.id!
  );
  if (response) {
    bids.value = response.bids.sort((a, b) => b.amount - a.amount);
  }

  if (componentProps.auction?.seller_id !== undefined) {
    const seller = await userStore.getClientById(
      componentProps.auction.seller_id
    );
    if (seller) {
      sellerName.value = seller.username;
      sellerSince.value = seller.created_at;
    }
  }
});

const hasWinnerBid = computed(() => {
  return bids.value.find((bid) => bid.bid_status === BidStatus.WINNER);
});
</script>

<style scoped>
td {
  width: 180px;
}

.seller-initials {
  width: 27px;
  height: 27px;
}

.title-truncate {
  max-width: 200px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-clamp: 2;
  -webkit-line-clamp: 2;
}

.highest-bid {
  min-width: 100px;
}
</style>
