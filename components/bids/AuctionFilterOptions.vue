<template>
  <div class="d-flex ga-2 mb-8">
    <v-btn
      v-for="status in statuses"
      :key="status.id"
      class="btn font-small rounded"
      :class="{
        ' btn-primary ': status.id === statusId,
        ' btn-secondary ': status.id !== statusId,
      }"
      height="25"
      @click="
        [(statusId = status.id), $emit('update:statusSelected', status.id)]
      "
    >
      {{ status.label }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { AuctionStatus } from "~/stores/enum";

defineEmits(["update:statusSelected"]);
const statusId = ref<number>();

const statuses = [
  { id: undefined, label: "Todos" },
  { id: AuctionStatus.PENDING, label: "Leilões abertos" },
  { id: AuctionStatus.FINISHED, label: "Leilões encerrados" },
  { id: AuctionStatus.CANCELED, label: "Leilões cancelados" },
];
</script>
