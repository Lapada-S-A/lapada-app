<template>
  <AuctionsMaintain :auction="auction" />
</template>

<script setup lang="ts">
import type { Auction } from "~/interfaces/auction";

const auction = ref<Auction>({
  title: "",
  description: "",
  end_date: "",
  type_id: 1,
  categories: [],
  min_increment: 0,
  initial_value: 0,
  seller_id: 1,
  status: AuctionStatus.PENDING,
});
</script>
