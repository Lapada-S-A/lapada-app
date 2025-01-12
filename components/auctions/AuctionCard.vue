<template>
  <div>
    <v-card width="250" height="300" class="pa-6 d-flex flex-column">
      <v-img src="@/assets/images/auction.png" class="mb-3" height="155" />
      <div class="flex-grow-1">
        <div class="font-large font-weight-bold mb-1 title-truncate">
          {{ title }}
        </div>
        <div class="font-small font-weight-semibold text-primary mb-2">
          {{ type }}
        </div>
      </div>

      <!-- Time and bid at the bottom -->
      <div class="d-flex justify-space-between font-small font-weight-bold">
        <div class="d-flex align-center ga-1">
          <v-icon color="secondary">mdi-clock-fast</v-icon>
          {{ remainingTime }}
        </div>
        <div class="d-flex align-center ga-1">
          <v-icon color="secondary">mdi-cash-multiple</v-icon>
          {{ highestBid }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  type: string;
  remainingTime: string;
  highestBid: string;
}>();
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
</style>
