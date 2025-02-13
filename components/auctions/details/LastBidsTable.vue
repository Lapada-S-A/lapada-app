<template>
  <div>
    <v-table class="ml-n4 opacity-50" density="compact">
      <thead>
        <tr>
          <th>Valor</th>
          <th>Usuário</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bid, index) in bids" :key="index" class="font-large">
          <td>{{ bid.amount }}</td>
          <td>{{ userNames[bid.buyer_id] || "Carregando..." }}</td>
          <td>{{ bid.bid_date }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import type { Bid } from "~/interfaces/bid";

const props = defineProps({
  bids: {
    type: Array as () => Bid[],
    required: true,
  },
});

const userStore = useUserStore();
const userNames = ref<Record<number, string>>({});

const fetchUserNames = async () => {
  const uniqueBuyerIds = [...new Set(props.bids.map((bid) => bid.buyer_id))];

  for (const id of uniqueBuyerIds) {
    if (!userNames.value[id]) {
      const user = await userStore.getClientById(id);
      if (user) {
        userNames.value[id] = user.username;
      } else {
        userNames.value[id] = "Desconhecido";
      }
    }
  }
};

watch(() => props.bids, fetchUserNames, { immediate: true });
onMounted(fetchUserNames);
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
