<template>
  <div class="d-flex align-center ga-2">
    <v-btn
      v-for="status in statuses"
      :key="status.id"
      class="btn font-small rounded"
      :class="{
        'btn-primary text-font-10': statusId === status.id,
        [`bg-${status.properties.color}`]: statusId === status.id,
        'btn-secondary': statusId !== status.id,
        [`text-${status.properties.color}`]: true,
      }"
      height="25"
      @click="
        [(statusId = status.id), $emit('update:statusSelected', status.id)]
      "
    >
      {{ status.properties.name }}s
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { AuctionStatus } from "~/stores/enum";

defineEmits(["update:statusSelected"]);
const statusId = ref<number>();

const statuses = [
  { id: undefined, properties: { name: "Todo", color: "primary" } },
  {
    id: AuctionStatus.OPEN,
    properties: getAuctionStatusProperties(AuctionStatus.OPEN),
  },
  {
    id: AuctionStatus.FINISHED,
    properties: getAuctionStatusProperties(AuctionStatus.FINISHED),
  },
  {
    id: AuctionStatus.PENDING,
    properties: getAuctionStatusProperties(AuctionStatus.PENDING),
  },
  {
    id: AuctionStatus.CANCELED,
    properties: getAuctionStatusProperties(AuctionStatus.CANCELED),
  },
  {
    id: AuctionStatus.REJECTED,
    properties: getAuctionStatusProperties(AuctionStatus.REJECTED),
  },
];
</script>

<style scoped>
.btn-secondary {
  border-color: unset !important;
}
</style>
