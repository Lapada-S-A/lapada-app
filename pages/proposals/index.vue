<template>
  <div class="h-100">
    <AuctionList :is-curator="true" />
  </div>
</template>

<script setup lang="ts">
import AuctionList from "~/components/auctions/AuctionList.vue";
</script>
