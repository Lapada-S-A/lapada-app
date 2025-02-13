<template>
  <v-dialog opacity="0.4" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" variant="text" size="25" class="ml-1"
        ><v-icon>mdi-dots-horizontal-circle-outline</v-icon></v-btn
      >
    </template>

    <template #default="{ isActive }">
      <v-card class="rounded-lg pa-4">
        <div>
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="font-subtitle font-weight-bold">Todos os lances</div>
            <v-btn
              id="close-filter-button"
              class="rounded-xl"
              variant="plain"
              :ripple="false"
              size="22"
              @click="isActive.value = false"
              ><v-icon> mdi-close</v-icon></v-btn
            >
          </v-card-title>
        </div>

        <v-card-text class="px-4 py-2 pb-4">
          <LastBidsTable :bids="bids" />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import LastBidsTable from "@/components/auctions/details/LastBidsTable.vue";
import type { Bid } from "~/interfaces/bid";

defineProps({
  bids: {
    type: Array as () => Bid[],
    required: true,
  },
});
</script>
