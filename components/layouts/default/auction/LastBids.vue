<template>
  <div class="mt-5">
    <h4 class="font-weight-bold text-primary">
      Últimos lances <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
    </h4>
    <v-table class="ml-n4 opacity-50" density="compact">
      <thead>
        <tr>
          <th>Valor</th>
          <th>Usuário</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bid, index) in bids" :key="index">
          <td>{{ bid.value }}</td>
          <td>{{ bid.user }}</td>
          <td>{{ bid.date }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script setup lang="ts">
defineProps({
  bids: {
    type: Array as () => { user: string; date: string; value: string }[],
    required: true,
  },
});
</script>
<style scoped>
.v-table--density-compact {
  --v-table-row-height: 4px !important;
}
.v-table .v-table__wrapper > table > thead > tr > th {
  border-bottom: 0px !important;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td {
  border-bottom: 0px !important;
}
</style>
