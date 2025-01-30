<template>
  <v-expansion-panel-title collapse-icon="mdi-minus">
    <div class="d-flex align-center justify-space-between w-100">
      <div class="d-flex align-center">
        <div
          class="font-small font-weight-semibold"
          :class="isOpened ? 'text-font-10' : 'text-primary'"
        >
          {{ auction.type }}
        </div>

        <v-divider
          class="mx-4 opacity-100"
          length="25"
          vertical
          :color="isOpened ? 'font-10' : 'font-60'"
        />

        <div class="font-large font-weight-bold">
          {{ auction.title }}
        </div>
      </div>

      <div
        class="d-flex align-center mr-16 font-small font-weight-semibold"
        :class="isOpened ? 'text-font-10' : 'text-font-60'"
      >
        <div class="mr-16">
          Lance atual:
          {{
            auction.highestBid > 0 ? formatCurrency(auction.highestBid) : "---"
          }}
        </div>

        <div>Data: {{ auction.startDate }}</div>
      </div>
    </div>
  </v-expansion-panel-title>
</template>

<script setup lang="ts">
defineProps<{
  auction: Auction;
  isOpened: boolean;
}>();
</script>
