<template>
  <div class="mt-5">
    <div class="font-weight-semibold text-primary">Vendedor</div>
    <v-row class="mt-1">
      <v-col cols="2" class="text-center">
        <div
          class="d-flex justify-center align-center seller-initials font-weight-bold bg-secondary text-font-10 rounded-circle"
        >
          {{ avatarInitials }}
        </div>
      </v-col>
      <v-col cols="10" class="mt-3 pl-4">
        <div class="d-flex flex-column text-font-100">
          <div class="font-title font-weight-bold">{{ name }}</div>
          <div class="d-flex align-center mt-n1">
            <v-icon color="warning">mdi-star</v-icon>
            <span class="mt-1 ml-1 font-weight-semibold">{{
              rating.average_rating
            }}</span>
          </div>
          <div class="">+{{ auctionsCount }} leilões desde {{ since }}</div>
        </div>
      </v-col>
    </v-row>
    <div class="mt-2 text-font-60 font-small">
      *Operações de pagamento e logística devem ser acordadas entre as partes.
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AverageRating } from "~/interfaces/review";
const props = defineProps({
  name: { type: String, required: true },
  rating: {
    type: Object as () => AverageRating,
    required: true,
    default: () => ({
      average_rating: 0,
      seller_id: 0,
    }),
  },
  auctionsCount: { type: Number, required: true },
  since: { type: Number, required: true },
});

const avatarInitials = computed(() => {
  return props.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});
</script>

<style scoped>
.seller-initials {
  height: 100px;
  width: 100px;
  font-size: 48px;
}
</style>
