<template>
  <div>
    <v-card width="250" height="300" class="pa-6 d-flex flex-column">
      <v-img src="@/assets/images/auction.png" class="mb-3" height="155" />
      <div class="flex-grow-1">
        <div class="font-large font-weight-bold mb-1 title-truncate">
          {{ auction.title }}
        </div>
        <div class="font-small font-weight-semibold text-primary mb-2">
          {{ getAuctionType(auction.type_id) }}
        </div>
      </div>

      <div class="d-flex justify-space-between font-small font-weight-bold">
        <div class="d-flex align-center ga-1">
          <v-icon color="secondary">mdi-clock-fast</v-icon>
          {{
            remainingTime > 0 ? formatSecondsToTimeString(remainingTime) : "---"
          }}
        </div>
        <div
          class="d-flex align-center ga-1"
          :class="{ 'mr-2': auction.initial_value === 0 }"
        >
          <v-icon color="secondary">mdi-cash-multiple</v-icon>
          <div class="text-truncate bid">
            {{
              auction.highest_bid > 0
                ? formatCurrency(auction.highest_bid)
                : "---"
            }}
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Auction } from "~/interfaces/auction";

const componentProps = defineProps<{
  auction: Auction;
}>();
const remainingTime = ref<number>(0);

function parseDateString(dateStr: string): Date {
  const [day, month, year, hour, minute, second] = dateStr
    .split("-")
    .map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
}

function calculateRemainingTime(startDate: string, endDate: string): number {
  const start = parseDateString(startDate).getTime();
  const end = parseDateString(endDate).getTime();
  return Math.floor((end - start) / 1000);
}

onMounted(() => {
  remainingTime.value = calculateRemainingTime(
    componentProps.auction.created_date,
    componentProps.auction.end_date
  );
});

function getAuctionType(typeId: number) {
  switch (typeId) {
    case 1:
      return "Leilão Comum";
    case 2:
      return "Leilão por Proximidade";
    case 3:
      return "Leilão Reverso";
  }
}
</script>

<style scoped>
:deep(.v-card) {
  color: rgba(var(--v-theme-font-100));
}

.title-truncate {
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-clamp: 2;
  -webkit-line-clamp: 2;
}

.bid {
  max-width: 120px;
}
</style>
