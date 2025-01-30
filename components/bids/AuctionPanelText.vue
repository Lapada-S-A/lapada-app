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
        <div class="font-weight-bold text-truncate">{{ auction.title }}</div>
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
        <div class="text-primary">Lance atual:</div>
        <div>{{ formatCurrency(auction.highestBid) }}</div>
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
              <td>{{ formatCurrency(bid.value) }}</td>
              <td :class="`text-${getStatusColor(bid.status.id)}`">
                {{ bid.status.name }}
              </td>
              <td>{{ bid.date }}</td>
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
import SellerActions from './SellerActions.vue';

defineProps<{
  auction: Auction;
}>();

const bids = ref([
  { value: 3000, status: { id: 1, name: "Vencedor" }, date: "17/11/2024" },
  { value: 2500, status: { id: 2, name: "Ativo" }, date: "17/11/2024" },
  { value: 2000, status: { id: 3, name: "Vencido" }, date: "16/11/2024" },
]);

function getStatusColor(statusId: number) {
  switch (statusId) {
    case 1:
      return "primary";
    case 2:
      return "success";
    case 3:
      return "error";
  }
}
</script>

<style scoped>
td {
  width: 175px;
}

.seller-initials {
  width: 20px;
  height: 20px;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
