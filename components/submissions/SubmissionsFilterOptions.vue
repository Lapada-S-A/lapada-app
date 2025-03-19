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
        [(statusId = status.id), $emit('update:typeSelected', status.id)]
      "
    >
      {{ status.label }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { SubmissionTypes } from "~/stores/enum";

defineEmits(["update:typeSelected"]);
const statusId = ref<number>(SubmissionTypes.CURATOR);

const statuses = [
  { id: SubmissionTypes.CURATOR, label: "Curadores" },
  { id: SubmissionTypes.SELLER, label: "Vendedores" },
];
</script>
