<template>
  <v-expansion-panel-title collapse-icon="mdi-minus">
    <v-row align="center" justify="space-between" class="w-100">
      <v-col cols="6">
        <v-row align="center">
          <v-col
            cols="3"
            class="font-small font-weight-semibold"
            :class="isOpened ? 'text-font-10' : 'text-primary'"
          >
            {{ auction.type }}
          </v-col>

          <v-col cols="1" class="d-flex justify-center">
            <v-divider
              class="opacity-100"
              length="25"
              vertical
              :color="isOpened ? 'font-10' : 'font-60'"
            />
          </v-col>

          <v-col cols="8" class="font-large font-weight-bold">
            {{ auction.title }}
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row
          align="center"
          justify="end"
          class="font-small font-weight-semibold"
          :class="isOpened ? 'text-font-10' : 'text-font-60'"
        >
          <v-col cols="6">
            Lance atual:
            {{
              auction.highestBid > 0
                ? formatCurrency(auction.highestBid)
                : "---"
            }}
          </v-col>
          <v-col cols="6">
            Data: {{ auction.startDate }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
</template>

<script setup lang="ts">
defineProps<{
  auction: Auction;
  isOpened: boolean;
}>();
</script>
