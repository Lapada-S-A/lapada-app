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
            {{ type ? type.name : "" }}
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
              auction.highest_bid ? formatCurrency(auction.highest_bid) : " ---"
            }}
          </v-col>
          <v-col cols="6">
            Data: {{ formatDate(auction.created_date!) }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
</template>

<script setup lang="ts">
import type { Auction } from "~/interfaces/auction";
import type { Type } from "~/interfaces/type";

const componentProps = defineProps<{
  auction: Auction;
  isOpened: boolean;
}>();
const typesStore = useTypesStore();
const type = ref<Type>();
onMounted(() => {
  type.value = typesStore.getTypeById(componentProps.auction.type_id);
});
</script>
