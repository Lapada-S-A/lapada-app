<template>
  <v-expansion-panel-text>
    <div class="d-flex py-8 px-4">
      <div>
        <v-img
          src="@/assets/images/auction.png"
          class="mb-1 rounded-lg"
          height="155"
          width="200"
        />
        <div class="font-weight-bold title-truncate">{{ auction.title }}</div>
        <div class="d-flex justify-space-between align-center mt-1">
          <div class="d-flex align-center font-smaller ga-1">
            <div
              class="d-flex align-center justify-center bg-secondary rounded-circle seller-initials"
            >
              MS
            </div>
            <div class="text-font-60">Matheus Sousa</div>
          </div>
          <div class="font-smaller text-font-60">29/10/2024</div>
        </div>
      </div>

      <div
        class="d-flex flex-column ml-16 pl-8 font-large font-weight-bold ga-3"
      >
        <div class="highest-bid text-primary">Lance atual:</div>
        <div>
          {{
            auction.highest_bid ? formatCurrency(auction.highest_bid) : " ---"
          }}
        </div>
      </div>

      <v-divider
        class="mx-10 opacity-100"
        length="120"
        vertical
        color="font-60"
      />

      <div class="d-flex flex-column ga-3">
        <div class="text-primary font-large font-weight-bold mb-1">
          Meus lances:
        </div>
        <table class="font-weight-regular">
          <thead>
            <tr class="font-normal text-font-60">
              <td>Valor</td>
              <td>Situação</td>
              <td>Data</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bid, index) in bids" :key="index">
              <td>{{ formatCurrency(bid.amount) }}</td>
              <td
                :class="{[`text-${getBidStatusProperties(bid.bid_status_id)!.color}`]: true, 'font-weight-semibold': bid.bid_status_id === BidStatus.WINNER}"
              >
                {{ getBidStatusProperties(bid.bid_status_id)!.name }}
              </td>
              <td>{{ formatDate(bid.bid_date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ml-10">
        <SellerActions />
      </div>
    </div>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import SellerActions from "./SellerActions.vue";
import type { Auction } from "~/interfaces/auction";
import type { Bid } from "~/interfaces/bid";

const componentProps = defineProps<{
  auction: Auction;
}>();
const bidsStore = useBidsStore();
const bids = ref<Bid[]>([]);

onMounted(async () => {
  const response = await bidsStore.getBidsByAuctionId(
    componentProps.auction.id!
  );
  if (response) {
    bids.value = response;
  }
});
</script>

<style scoped>
td {
  width: 175px;
}

.seller-initials {
  width: 20px;
  height: 20px;
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
